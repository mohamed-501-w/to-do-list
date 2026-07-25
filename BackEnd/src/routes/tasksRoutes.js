import e from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/taskControllers.js";
import requireAuth from "../middleware/auth.js";

const taskRouter = e.Router();

taskRouter.use(requireAuth)
//routing
taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);



export default taskRouter;
