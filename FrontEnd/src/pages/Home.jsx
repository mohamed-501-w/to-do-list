import { useEffect, useState } from "react"
import axios from "axios"
import { ListChecks, ListTodo, Plus } from "lucide-react"

import HomeCard from "../components/HomeCard"
import ToolBar from "../components/ToolBar"
import { Link } from "react-router"
import toast, { Toaster } from "react-hot-toast"

export default function Home() {
    const [tasksData, setTasksData] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL}`)
                setTasksData(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    }, [])

    const deleteTask = async (id) => {
        await axios.delete(`${import.meta.env.VITE_URL}/${id}`)
        setTasksData((prev) => prev.filter((task) => task._id !== id))
    }

    const tasks = tasksData.map((task) => (
        <HomeCard deleteTask={deleteTask} key={task._id} task={task} />
    ))

    return (
        <div className="bg-background text-background-content relative z-10 min-h-screen">
            <Toaster />
            <div className="fixed top-1/2 left-1/2 -z-50 -translate-1/2 text-mauve-500/20">
                <ListTodo size={24} className="size-[50vw] max-w-160" />
            </div>
            <div className="mx-auto max-w-7xl space-y-8 p-8 font-mono tracking-wider">
                <div className="flex justify-between">
                    <div className="drop-shadow-primary flex items-baseline gap-2 text-taupe-200 drop-shadow-sm">
                        <h1 className="text-4xl font-bold"> Tasks</h1>
                        <ListTodo size={32} />
                    </div>

                    <Link
                        to="/create"
                        className="bg-primary flex gap-1 rounded-2xl px-3 py-2 text-lg duration-300 hover:scale-105"
                    >
                        <Plus strokeWidth={3} className="mt-0.5" />
                        <span>Add task</span>
                    </Link>
                </div>

                <div className="mb-8">
                    <ToolBar />
                </div>

                <div className="text-primary flex flex-col gap-8">{tasks}</div>
            </div>
        </div>
    )
}
