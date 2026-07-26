import { useEffect, useState } from "react"
import api from "../util/api"
import { CircleUserRound, ListTodo, Plus } from "lucide-react"

import HomeCard from "../components/HomeCard"
import ToolBar from "../components/ToolBar"
import { Link, useNavigate } from "react-router"
import toast, { Toaster } from "react-hot-toast"
import { useAuth } from "../context/useAuth"

export default function Home() {
    const [tasksData, setTasksData] = useState([])
    const { accessToken } = useAuth()
    const nav = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.get("/", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                setTasksData(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    }, [accessToken])

    const deleteTask = async (id) => {
        try {
            await api.delete(`/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            setTasksData((prev) => prev.filter((task) => task._id !== id))
        } catch (error) {
            toast.error("Please try again")
        }
    }

    const { setAccessToken } = useAuth()

    const handleLogout = async () => {
        await api.post(
            `${import.meta.env.VITE_AUTH_URL}/logout`,
            {},
            { withCredentials: true },
        )
        setAccessToken(null)
        nav("/login")
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
                <div className="flex justify-between flex-col sm:flex-row gap-y-4">
                    <div className="drop-shadow-primary flex items-baseline gap-2 text-taupe-200 drop-shadow-sm">
                        <h1 className="text-4xl font-bold"> Tasks</h1>
                        <ListTodo size={32} />
                    </div>
                    <div className="justify-between flex   items-center gap-4 ">
                        <div className="group items relative">
                            <button className="flex duration-300 hover:scale-110 justify-between">
                                <CircleUserRound size={40} />
                            </button>
                            <div className="pointer-events-none absolute right-1/2 bottom-0 z-10 translate-x-1/2 translate-y-[120%] scale-50 opacity-0 transition duration-200 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100">
                                <button
                                    className="bg-primary rounded-full p-2 duration-300 hover:scale-105"
                                    onClick={handleLogout}
                                >
                                    logout
                                </button>
                            </div>
                        </div>

                        <Link
                            to="/create"
                            className="bg-primary flex gap-1 rounded-2xl px-3 py-2 text-lg duration-300 hover:scale-105"
                        >
                            <Plus strokeWidth={3} className="mt-0.5" />
                            <span>Add task</span>
                        </Link>
                    </div>
                </div>

                <div className="mb-8">
                    <ToolBar />
                </div>

                <div className="text-primary flex flex-col gap-8">{tasks}</div>
            </div>
        </div>
    )
}
