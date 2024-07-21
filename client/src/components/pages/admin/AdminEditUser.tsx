import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserById } from "../../../app/api/usersApiSlice"
import AdminEditUserForm from "./AdminEditUserForm"


export default function AdminEditUser() {
    const { id } = useParams()
    const user = useSelector(state => selectUserById(state, id))
    const content = user ? <AdminEditUserForm user={user} /> : <p>LOADING...</p>

    return content
}