import { useEffect, useState } from "react";

export default function AdminUsers() {
    const baseUrl = "http://localhost:3000/api/"

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers() {
            try {
                const res = await fetch(`${baseUrl}users/`)
                const jsonResult = await res.json()
                setUsers(jsonResult)
            } catch (error) {
                console.log({ error })
            }
        }

        getUsers()

    }, [])

    return (
        <div>
            <p>Admin User Page</p>

            <ul>{users.map(user => (
                <li key={user._id}>{user.email}</li>
            ))}</ul>
        </div>
    )
}