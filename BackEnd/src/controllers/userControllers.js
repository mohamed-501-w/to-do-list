import JsonWebTokenError from "jsonwebtoken"
import User from "../models/User.js"
import { hashing, passCompare } from "../util/hashPassword.js"
import { makeAccessToken, makeRefreshToken } from "../util/jwt.js"

export const register = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashedPassword = await hashing(password)
        const user = new User({ username, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: "Account created" })
    } catch (error) {
        //later add error for user not unique
        console.log("error->", error.message)
        if (error.message === "username is taken") {
            return res.status(409).json({ error: "username is taken" })
        }

        res.status(500).json({ message: "Internal server error", error })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        if (!(await passCompare(password, user.password))) {
            return res.status(401).json({ error: "Password doesn't match" })
        }

        const accessToken = await makeAccessToken(user.username)
        const refreshToken = await makeRefreshToken(user.username)

        user.refreshToken = await hashing(refreshToken)
        await user.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.json(accessToken)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error })
    }
}

export const logout = async (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) return res.status(200).json({ message: "Already logged out" })

    try {
        const decoded = JsonWebTokenError.verify(
            token,
            process.env.REFRESH_TOKEN,
        )
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

    try {
        const decoded = await JsonWebTokenError.verify(
            token,
            process.env.REFRESH_TOKEN,
        )
        if (!decoded) return res.status(401).json({ message: "not authorized" })

        const user = await User.findOne({ username: decoded.username })
        if (!user) return res.status(401).json({ message: "not authorized" })

        if (!(await passCompare(token, user.refreshToken)))
            return res.status(401).json({ message: "not authorized" })
        const accessToken = await makeAccessToken(decoded.username)
        res.json({ accessToken })
    } catch (error) {
        res.status(401).json({ message: "not authorized" })
    }
}
