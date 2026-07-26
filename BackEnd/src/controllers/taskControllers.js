import Task from "../models/Task.js"

//get tasks array
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ username: req.username })
        console.log("Got tasks successfully!")
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json("Internal Server error!")
        console.error("Server error:", error)
    }
}

//get task with id
export const getTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)

        if (!task) {
            console.log("task not Found")
            return res.status(404).json({ message: "Task not found" })
        }

        console.log("Got task successfully!")
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json("Internal Server error!")
        console.error("Server error:", error)
    }
}

//create task
export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body
        const task = new Task({ title, description, username: req.username })
        await task.save()

        console.log("Created task successfully!")
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json("Internal Server error!")
        console.error("Server error:", error)
    }
}

//update task with id
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description },
            { new: true },
        )

        if (!task) {
            console.log("task not Found")
            return res.status(404).json({ message: "Task not found" })
        }

        console.log("Updated Task successfully!")
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json("Internal Server error!")
        console.error("Server error:", error)
    }
}

//delete task with id
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            console.log("task not Found")
            return res.status(404).json({ message: "Task not found" })
        }

        console.log("deleted Task successfully!")
        res.status(200).json({message: "deleted Task successfully!"})
    } catch (error) {
        res.status(500).json("Internal Server error!")
        console.error("Server error:", error)
    }
}
