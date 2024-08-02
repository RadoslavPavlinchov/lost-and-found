import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function Dashboard() {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <Outlet />
        </div>
    )
}
