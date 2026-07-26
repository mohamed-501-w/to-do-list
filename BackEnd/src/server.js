import e from "express"
import connectDb from "./util/db.js"
import taskRouter from "./routes/tasksRoutes.js"
import ratelimiter from "./middleware/ratelimiter.js"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app = e()
const PORT = process.env.PORT

app.use(cookieParser())
app.use(
    cors({
        origin: "https://to-do-list-mern-md.vercel.app",
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
)
app.use(e.json())
app.use(ratelimiter)
app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)
app.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found",
        message: `The requested path ${req.url} does not exist or this method is not supported.`,
    })
})

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("server Start on Port:", PORT)
    })
})
