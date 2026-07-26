// api.js
import axios from "axios"

const api = axios.create({ baseURL: import.meta.env.VITE_URL, withCredentials: true })

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                const refreshRes = await axios.post(
                    `${import.meta.env.VITE_AUTH_URL}/refresh`,
                    {},
                    { withCredentials: true }
                )
                const newToken = refreshRes.data.accessToken
                error.config.headers.Authorization = `Bearer ${newToken}`
                return axios(error.config)  // retry the original request
            } catch {
                // refresh itself failed — force logout
                window.location.href = "/login"
            }
        }
        return Promise.reject(error)
    }
)

export default api