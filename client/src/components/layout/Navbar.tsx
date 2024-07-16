import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import navigationConfig from "../../configs/navigationConfig"

// To-Do: use NavLink component to add styles dynamically due to having inside state

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                {
                    navigationConfig.map(navItem => {
                        return (
                            <li key={navItem.text} className={styles.navItem}>
                                <NavLink
                                    to={navItem.to}
                                    className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}
                                >
                                    {navItem.text}
                                </NavLink>
                            </li>
                        )
                    })
                }

            </ul>
        </nav >
    )
}