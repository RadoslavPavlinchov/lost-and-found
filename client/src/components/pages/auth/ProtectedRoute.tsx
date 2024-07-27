import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../../customHooks/useAuth"

const ProtectedRoute = ({ allowedRoles }) => {
    const {
        // name,
        isAdmin,
    } = useAuth()

    const location = useLocation()

    return allowedRoles.includes("admin") && isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )

    // if (!name) {
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }

    // if (isAdmin) {
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }

    // return <Outlet />
}

export default ProtectedRoute
