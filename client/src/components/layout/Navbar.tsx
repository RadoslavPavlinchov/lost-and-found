// import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import navigationConfig from "../../configs/navigationConfig"
import { useLogoutMutation } from "../../app/api/authApiSlice"
import useAuth from "../../customHooks/useAuth"

// To-Do: use NavLink component to add styles dynamically due to having inside state

export default function Navbar() {
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

    const { name, isAdmin } = useAuth()

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

    const visibleNavigationItems = navigationConfig.filter((navItem) => {
        console.log("navItem 1", navItem.visibility.admin, isAdmin)

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
            {/* create separate component for the current user and logout button */}
            {name && <p>Current User: {name}</p>}

            {name && (
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    )
}
