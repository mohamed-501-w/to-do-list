import axios from "axios"
import { LoaderCircle } from "lucide-react"
import { useActionState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router"

export default function Register() {
    const nav = useNavigate()

    const registerUser = async (prevState, formData) => {
        try {
            await axios.post(`${import.meta.env.VITE_AUTH_URL}/register`, {
                username: formData.get("username"),
                password: formData.get("password"),
            })
            toast.success("Account created")
            nav("/login")
        } catch (error) {
            const message = error.response?.data?.error || "Something went wrong"
            toast.error(message)
        }
    }

    const [, formAction, isSaving] = useActionState(registerUser, null)

    return (
        <div className="bg-background font text-background-content min-h-screen p-5 font-mono">
            <Toaster />

            <div>
                <form
                    action={formAction}
                    className="mx-auto mt-24 max-w-lg rounded-2xl bg-taupe-800 p-6 text-taupe-200"
                >
                    <h1 className="mb-4 text-xl font-bold">Create an account</h1>

                    <label className="space-y-4">
                        <h2 className="font-semibold">Username</h2>
                        <input
                            className="w-full rounded-2xl border-2 border-blue-500 bg-taupe-700 p-2 outline-blue-600 focus:outline"
                            type="text"
                            name="username"
                            required={true}
                        />
                    </label>

                    <label className="my-4 flex flex-col space-y-4">
                        <h2 className="font-semibold">Password</h2>
                        <input
                            className="w-full rounded-2xl border-2 border-blue-500 bg-taupe-700 p-2 outline-blue-600 focus:outline"
                            type="password"
                            name="password"
                            required={true}
                        />
                    </label>

                    <button
                        className="mx-auto block rounded-2xl bg-blue-600 px-8 py-2 font-bold shadow-blue-500 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-sm disabled:cursor-not-allowed disabled:bg-taupe-100/50"
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <div className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin" strokeWidth={4} size={16} />
                                Creating account
                            </div>
                        ) : (
                            "Register"
                        )}
                    </button>

                    <p className="mt-4 text-center text-sm text-taupe-200">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}