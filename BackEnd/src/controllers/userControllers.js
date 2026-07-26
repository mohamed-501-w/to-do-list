import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { hashing, passCompare } from "../util/hashPassword.js"
import { makeAccessToken, makeRefreshToken } from "../util/jwt.js"

export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Username and password are required" })
        }

        const hashedPassword = await hashing(password)
        const user = new User({ username, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: "Account created" })
    } catch (error) {
        //later add error for user not unique
        console.log("error->", error.message)
        console.log("error->", error)
        if (error.message === "username is taken") {
            return res.status(409).json({ error: "username is taken" })
        }

        res.status(500).json({ message: "Internal server error", error })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Username and password are required" })
        }

        const user = await User.findOne({ username })
        if (!user || !(await passCompare(password, user.password))) {
            return res
                .status(401)
                .json({ error: "Invalid username or password" })
        }

        const accessToken = await makeAccessToken(user.username)
        const refreshToken = await makeRefreshToken(user.username)

        user.refreshToken = await hashing(refreshToken)
        await user.save()

        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: SEVEN_DAYS_MS,
        })
        res.json({accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error })
    }
}

export const logout = async (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) return res.status(200).json({ message: "Already logged out" })

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN)
        const user = await User.findOne({ username: decoded.username })
        user.refreshToken = null
        user.save()
    } catch (error) {}
    res.clearCookie("refreshToken")
    res.status(200).json({ message: "Logged out" })
}

export const refresh = async (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) return res.status(401).json({ message: "not authorized" })

    const unauthorized = (res) =>
        res.status(401).json({ message: "not authorized" })

    try {
        const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN)
        if (!decoded) return unauthorized(res)

        const user = await User.findOne({ username: decoded.username })
        if (!user) return unauthorized(res)

        if (!(await passCompare(token, user.refreshToken)))
            return unauthorized(res)
        const accessToken = await makeAccessToken(decoded.username)
        res.json({ accessToken })
    } catch (error) {
        unauthorized(res)
    }
}
