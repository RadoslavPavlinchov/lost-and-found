import { Link, useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../../app/api/authApiSlice"

export default function Sidebar() {
    const navigate = useNavigate()
    const [
        logout,
        {
            isLoading,
            // isSuccess,
            isError,
            error,
        },
    ] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logout()

            // TODO: checkout why the isSuccess is not working and better use the useEffect hook

            // if (isSuccess) {
            navigate("/")
            // }
        } catch (error) {
            console.error("Error logging out", error)
        }
    }

    if (isLoading) return <div>Logging Out...</div>

    if (isError) return <div>Error: {error.data?.message}</div>

    return (
        <div className="flex flex-col w-64 bg-blue text-white">
            <div className="flex flex-col p-4">
                <Link
                    to="/dashboard/profile"
                    className="py-2 hover:bg-gray-700"
                >
                    Profile
                </Link>
                <Link
                    to="/dashboard/create-item"
                    className="py-2 hover:bg-gray-700"
                >
                    Add New Item
                </Link>
                <Link
                    to="/dashboard/profile"
                    className="py-2 hover:bg-gray-700"
                >
                    My Items
                </Link>
                {/* <Link
                    to="/dashboard/profile"
                    className="py-2 hover:bg-gray-700"
                >
                    Found Items
                </Link>
                <Link
                    to="/dashboard/profile"
                    className="py-2 hover:bg-gray-700"
                >
                    Lost Items
                </Link> */}
                <Link
                    to="/"
                    className="py-2 hover:bg-gray-700"
                    onClick={handleLogout}
                >
                    Logout
                </Link>
            </div>
        </div>
    )
}
