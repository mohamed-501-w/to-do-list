import dotenv from "dotenv"
import jwt from "jsonwebtoken"

const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).json({ message: "no token" })
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.username = user.username
        next()
    } catch (error) {
        res.status(401).json({ message: "token expired or not found" })
    }
}

export default requireAuth
