import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../customHooks/useAuth"

export default function PublicRoute() {
    const { name } = useAuth()

    return name ? <Navigate to="/" /> : <Outlet />
}
