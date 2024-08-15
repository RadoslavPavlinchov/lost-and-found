import { useSelector } from "react-redux"
import { selectCurrentToken } from "../app/api/authSlice"
import { jwtDecode } from "jwt-decode"

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    let isAdmin = false

    if (token) {
        const decodedToken = jwtDecode(token)
        const { name, role, email, id, avatar } = decodedToken.userInfo

        isAdmin = role === "admin"

        return {
            name,
            role,
            email,
            id,
            isAdmin,
            avatar,
        }
    }

    return {
        name: "",
        role: "",
        email: "",
        id: "",
        isAdmin,
        avatar: "",
    }
}

export default useAuth
