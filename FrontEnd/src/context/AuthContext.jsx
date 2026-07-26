import axios from "axios"
import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .post(
                `${import.meta.env.VITE_AUTH_URL}/refresh`,
                {},
                { withCredentials: true },
            )
            .then((res) => setAccessToken(res.data.accessToken))
            .catch(() => setAccessToken(null))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}


