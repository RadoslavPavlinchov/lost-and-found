import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../customHooks/useAuth"

export default function AdminPrivateRoute() {
    const { isAdmin, name } = useAuth()

    return name && isAdmin ? <Outlet /> : <Navigate to="/" />
}
