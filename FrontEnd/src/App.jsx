import React from "react"
import { Route, Routes, Navigate } from "react-router"
import Home from "./pages/Home"
import CreateTask from "./pages/CreateTask"
import EditTask from "./pages/EditTask"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAuth } from "./context/useAuth"

function ProtectedRoute({ children }) {
    const { accessToken, isLoading } = useAuth()
    if (isLoading) return <div>Loading...</div>
    if (!accessToken) return <Navigate to="/login" />
    return children
}

function PublicRoute({ children }) {
    const { accessToken, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>
    if (accessToken) return <Navigate to="/" />

    return children
}

export default function App() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/create"
                element={
                    <ProtectedRoute>
                        <CreateTask />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/task/:id"
                element={
                    <ProtectedRoute>
                        <EditTask />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}
