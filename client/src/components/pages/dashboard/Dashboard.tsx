import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function Dashboard() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <Outlet />
        </div>
    )
}
