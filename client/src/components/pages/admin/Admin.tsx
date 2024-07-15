import { Link, Outlet } from 'react-router-dom';

export default function Admin() {
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