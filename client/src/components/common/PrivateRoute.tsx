import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../customHooks/useAuth"

export default function PrivateRoute() {
    const { name } = useAuth()

    return name ? <Outlet /> : <Navigate to="/login" />
}
