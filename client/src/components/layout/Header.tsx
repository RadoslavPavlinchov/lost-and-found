import styles from "./Header.module.css"
import Logo from "./Logo"
import Navbar from "./Navbar"
import useAuth from "../../customHooks/useAuth"
import { NavLink, useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../app/api/authApiSlice"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"

export default function Header() {
    const navigate = useNavigate()
    const { name, avatar } = useAuth()

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
        <header className="bg-darkBlue shadow-md">
            <div className="flex justify-between items-center mx-4 p-4 text-sm sm:text-xl">
                <Logo />

                <Navbar />

                {/* Create a separate component that will include Register, Login, Profile and Logout links, */}

                {name ? (
                    <>
                        {/* <NavLink
                            to="/add-item"
                            className={({ isActive }) =>
                                isActive ? styles.activeNavLink : styles.navLink
                            }
                        >
                            + Add Item
                        </NavLink> */}
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2">
                                    <img
                                        alt="dashboard"
                                        src={avatar}
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                                    />
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <NavLink
                                            to="/dashboard/profile"
                                            // className={({ isActive }) =>
                                            //     isActive
                                            //         ? styles.activeNavLink
                                            //         : styles.navLink
                                            // }
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        >
                                            Dashboard
                                        </NavLink>
                                    </MenuItem>
                                </div>
                                <div className="py-1">
                                    <MenuItem>
                                        <NavLink
                                            to="/"
                                            // className={({ isActive }) =>
                                            //     isActive
                                            //         ? styles.activeNavLink
                                            //         : styles.navLink
                                            // }
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </NavLink>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? styles.activeNavLink : styles.navLink
                        }
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </header>
    )
}
