import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const accessToken = process.env.ACCESS_TOKEN
const refreshToken = process.env.REFRESH_TOKEN

export const makeAccessToken = async (username, date) => {
    return await jwt.sign({ username: username }, accessToken, date)
}
export const makeRefreshToken = async (username) => {
    return await jwt.sign({ username: username }, accessToken)
}
