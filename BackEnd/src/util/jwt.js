import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const accessToken = process.env.ACCESS_TOKEN
const refreshToken = process.env.REFRESH_TOKEN

export const makeAccessToken = async (username) => {
    return await jwt.sign({ username: username }, accessToken, {expiresIn: "15m"})
}
export const makeRefreshToken = async (username) => {
    return await jwt.sign({ username: username }, refreshToken, {expiresIn: "7d"})
}
