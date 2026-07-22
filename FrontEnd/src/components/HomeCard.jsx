import { Circle, SquarePen, Trash2 } from "lucide-react"
import React from "react"
import formatTime from "../util/formatTime"
import axios from "axios"
import { Link } from "react-router"
import toast from "react-hot-toast"

export default function HomeCard({ task, deleteTask }) {
    const completed = () => {
        toast.success("Congrats")
        setTimeout(() => {
            deleteTask(task._id)
        }, 500)
    }
    const deleteT = async () => {
        await deleteTask(task._id)
        toast.error("Task deleted")
    }

    return (
        <div className="border-primary text-background-content flex gap-4 rounded-2xl border-l-4 bg-taupe-800 px-4 py-2 shadow-sm shadow-taupe-500">
            <button onClick={completed} className="flex">
                <Circle size={20} className="mt-1" />
            </button>
            <div className="min-w-0 space-y-3">
                <h1 className="truncate">{task.title}</h1>
                <p className="truncate text-neutral-400">{task.description}</p>
                <p className="text-sm text-neutral-500 uppercase">
                    {formatTime(new Date(task.createdAt))}
                </p>
            </div>
            <div className="ml-auto flex flex-col justify-between pl-4">
                <Link to={`/task/${task._id}`}>
                    <SquarePen
                        size={20}
                        className="mt-1 transition duration-300 ease-out hover:scale-120 hover:text-blue-400"
                    />
                </Link>
                <button onClick={deleteT}>
                    <Trash2
                        className="text-error/70 hover:text-error transition-all duration-300 ease-out hover:scale-130 hover:-rotate-2"
                        size={20}
                    />
                </button>
            </div>
        </div>
    )
}
