import axios from "axios"
import { LoaderCircle, ArrowLeft } from "lucide-react"
import { useState, useActionState, useEffect } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"

export default function EditTask() {
    const [task, setTask] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const nav = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_URL}/${id}`,
            )
            setTask(response.data)
            setIsLoading(false)
        }
        fetch()
    }, [])

    const saveTask = async (prevState, formData) => {
        try {
            await axios.put(`${import.meta.env.VITE_URL}/${id}`, {
                title: formData.get("title"),
                description: formData.get("description"),
            })
            toast.success("Task Updated !")
            nav("/")
        } catch (error) {
            console.error(error)
        }
    }

    const [, formAction, isSaving] = useActionState(saveTask, null)

    return (
        <div className="bg-background font text-background-content min-h-screen p-5 font-mono">
            <Toaster />

            <div>
                <div className="mx-auto my-4 max-w-lg">
                    <Link
                        to="/"
                        className="flex w-fit gap-2 rounded-4xl px-2 py-2 text-xs duration-200 hover:bg-taupe-800"
                    >
                        <ArrowLeft strokeWidth={1} size={16} />
                        <span>Back to Tasks</span>
                    </Link>
                </div>
                <form
                    action={formAction}
                    className="mx-auto max-w-lg rounded-2xl bg-taupe-800 p-6 text-taupe-200"
                >
                    <h1 className="mb-4 text-xl font-bold">Edit task</h1>
                    <label className="space-y-4">
                        <h2 className="font-semibold">Title</h2>
                        <input
                            className="w-full rounded-2xl border-2 border-blue-500 bg-taupe-700 p-2 outline-blue-600 focus:outline"
                            defaultValue={task.title}
                            type="text"
                            name="title"
                            required={true}
                        />
                    </label>
                    <label className="my-4 flex flex-col space-y-4">
                        <h2 className="font-semibold">Description</h2>
                        <textarea
                            className="min-h-30 rounded-2xl border-2 border-blue-500 bg-taupe-700 p-2 outline-blue-600 focus:outline"
                            defaultValue={task.description}
                            name="description"
                            id=""
                            required={true}
                        ></textarea>
                    </label>
                    <button
                        className="mx-auto block rounded-2xl bg-blue-600 px-8 py-2 font-bold shadow-blue-500 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-sm disabled:cursor-not-allowed disabled:bg-taupe-100/50"
                        disabled={isLoading || isSaving}
                    >
                        {isSaving || isLoading ? (
                            <div className="flex items-center gap-2">
                                <LoaderCircle
                                    className="animate-spin"
                                    strokeWidth={4}
                                    size={16}
                                />
                                {isLoading ? "Loading" : "Saving"}
                            </div>
                        ) : (
                            "Save"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
