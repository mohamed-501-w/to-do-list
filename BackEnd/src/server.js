import e from "express";
import connectDb from "./util/db.js";
import router from "./routes/tasksRoutes.js";
import ratelimiter from "./middleware/ratelimiter.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = e();
const PORT = process.env.PORT;

app.use(cors());
app.use(e.json());
app.use(ratelimiter);
app.use("/api/tasks", router);
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested path ${req.url} does not exist or this method is not supported.`
  });
});


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("server Start on Port:", PORT);
  });
});
