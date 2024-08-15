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
        <div className="flex flex-col w-72 bg-blue text-white">
            <div className="flex flex-col">
                <div className="py-2 hover:bg-gray-700 w-full border-b-2 border-gray-400">
                    <Link
                        to="/dashboard/profile"
                        className="block w-full h-full pl-4 m-2"
                    >
                        Profile
                    </Link>
                </div>
                <div className="py-2 hover:bg-gray-700 w-full border-b-2 border-gray-400">
                    <Link
                        to="/dashboard/create-item"
                        className="block w-full h-full pl-4 m-2"
                    >
                        Add New Item
                    </Link>
                </div>
                <div className="py-2 hover:bg-gray-700 w-full border-b-2 border-gray-400">
                    <Link
                        to="/dashboard/my-items"
                        className="block w-full h-full pl-4 m-2"
                    >
                        My Items
                    </Link>
                </div>
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
                <div className="py-2 hover:bg-gray-700 w-full border-b-2 border-gray-400">
                    <Link
                        to="/"
                        className="block w-full h-full pl-4 m-2"
                        onClick={handleLogout}
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    )
}
