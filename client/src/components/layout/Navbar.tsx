// import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import navigationConfig from "../../configs/navigationConfig"
import { useLogoutMutation } from "../../app/api/authApiSlice"

// To-Do: use NavLink component to add styles dynamically due to having inside state

export default function Navbar() {
    const navigate = useNavigate()

    const [logout, {
        isLoading,
        // isSuccess,
        isError,
        error
    }] = useLogoutMutation()

    // useEffect(() => {
    //     console.log("isSuccess", isSuccess)

    //     if (isSuccess) {
    //         console.log("Logout successful")
    //         navigate("/")
    //     }
    // }, [isSuccess, navigate])

    if (isLoading) return <div>Logging Out...</div>

    if (isError) return <div>Error: {error.data?.message}</div>

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

            {/* // TODO: checkout if a button or additional NavLink is needed */}
            <button
                className={styles.logoutButton}
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav >
    )
}