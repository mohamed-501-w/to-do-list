import e from "express"
import { register, login, logout, refresh } from "../controllers/userControllers.js"

const userRouter = e.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.post('/refresh', refresh)


export default userRouter