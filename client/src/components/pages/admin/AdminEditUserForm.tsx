import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "../../../app/api/usersApiSlice"
import { useNavigate } from "react-router-dom"

export default function EditUserForm({ user }) {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(user.name)
    const [validName, setValidName] = useState(false)
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [role, setRole] = useState('user')

    // Set better validation for name
    useEffect(() => {
        setValidName(name.length > 0)
    }, [name])

    // Set better validation for email
    useEffect(() => {
        setValidEmail(email.length > 0)
    }, [email])

    // Set better validation for password
    useEffect(() => {
        setValidPassword(password.length > 0)
    }, [password])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setName('')
            setEmail('')
            setPassword('')
            setRole('user')
            navigate('/admin/users')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onNameChange = (e) => setName(e.target.value)
    const onEmailChange = (e) => setEmail(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)
    const onRoleChange = (e) => {
        // get the correct value from the select element
        const value = e.target.selectedOptions
        setRole(value)
    }

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, name, email, password, role })
        } else {
            await updateUser({ id: user.id, name, email, role })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    // const options = ["user", "admin"].map(role => {
    //     return (
    //         <option
    //             key={role}
    //             value={role}
    //         >
    //             {role}
    //         </option>
    //     )
    // })

    let canSave
    if (password) {
        canSave = validName && validEmail && validPassword && !isLoading
    } else {
        canSave = validName && validEmail && !isLoading
    }

    const content = (
        <>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            Save
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onNameChange}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onEmailChange}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </div>

                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={onRoleChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

            </form>
        </>
    )

    return content
}