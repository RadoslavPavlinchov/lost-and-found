import styles from "./Header.module.css"
import { NavLink } from "react-router-dom"
import Logo from "./Logo"
import Navbar from "./Navbar"

export default function Header() {
    return (
        <header className="bg-darkBlue shadow-md">
            <div className="flex justify-between items-center mx-4 p-4">
                <Logo />

                <Navbar />

                {/* Create a separate component that will include Register, Login, Profile and Logout links, */}

                <ul>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? styles.activeNavLink : styles.navLink
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}
