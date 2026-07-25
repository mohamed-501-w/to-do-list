import mongoose from "mongoose"

const Schema = mongoose.Schema

//task schema for db
const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)
//task model for db
const Task = mongoose.model("Task", taskSchema)

export default Task
