import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserById } from "../../app/api/userApiSlice"

export default function ListItem({ userId }) {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (!user) {
        return null
    }

    const handleEdit = () => navigate(`/admin/users/${userId}`)
    const handleDelete = () => navigate(`/admin/users/${userId}`)
    const handleInfo = () => navigate(`/admin/users/${userId}`)

    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.createdAt}</td>

            <td className="actions">
                <button className="btn edit-btn" title="Edit" onClick={handleEdit}></button>
                <button className="btn delete-btn" title="Delete" onClick={handleDelete}></button>
                <button className="btn info-btn" title="Info" onClick={handleInfo}></button>
            </td>
        </tr>
    )
}