import { useEffect } from "react"
import { Link, Outlet } from 'react-router-dom'
import { store } from "../../../app/store"
import { usersApiSlice } from "../../../app/api/usersApiSlice"

export default function Admin() {
    useEffect(() => {
        console.log('Prefetching users...')

        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('Unsubscribing to users...')

            users.unsubscribe()
        }
    }, [])


    return (
        <>
            <nav style={{ backgroundColor: "red", padding: 20 }}>
                <Link to="/admin/users" style={{ padding: 20 }}>Users</Link>
                <Link to="/admin/items" style={{ padding: 20 }}>Items</Link>
            </nav>

            <Outlet />
        </>
    )
}