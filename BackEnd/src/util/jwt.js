import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const accessToken = process.env.ACCESS_TOKEN
const refreshToken = process.env.REFRESH_TOKEN

const ACCESS_TOKEN_EXPIRY = "15m"
const REFRESH_TOKEN_EXPIRY = "7d"

export const makeAccessToken = async (username) => {
    return await jwt.sign({ username }, accessToken, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    })
}
export const makeRefreshToken = async (username) => {
    return await jwt.sign({ username }, refreshToken, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    })
}
