import { NavLink } from "react-router-dom"

export default function Logo() {
    return (
        <NavLink to={"/"}>
            <h1 className="font-bold text-sm sm:text-xl flex flex-col">
                <span className="text-white">Lost</span>
                <span className="text-white">&</span>
                <span className="text-white">Found</span>
            </h1>
        </NavLink>
    )
}
