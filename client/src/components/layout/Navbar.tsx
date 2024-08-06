import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import navigationConfig from "../../configs/navigationConfig"
import useAuth from "../../customHooks/useAuth"

export default function Navbar() {
    const { name, isAdmin } = useAuth()

    const visibleNavigationItems = navigationConfig.filter((navItem) => {
        // PUBLIC ROUTES
        if (!name) {
            return navItem.visibility.public
        }

        // PRIVATE ROUTES: Admin only
        if (isAdmin) {
            return navItem.visibility.private.includes("admin")
        }

        return navItem.visibility.private.includes("user")
    })

    return (
        <nav className="">
            <ul className="flex gap-4">
                {visibleNavigationItems.map((navItem) => {
                    return (
                        <li key={navItem.text} className={styles.navItem}>
                            <NavLink
                                to={navItem.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? styles.activeNavLink
                                        : styles.navLink
                                }
                            >
                                {navItem.text}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
