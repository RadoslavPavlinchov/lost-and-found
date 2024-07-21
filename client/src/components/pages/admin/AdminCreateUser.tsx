import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAddNewUserMutation } from '../../../app/api/usersApiSlice'

export default function AdminCreateUser() {
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    // Try using one object for state with interface "User" instead of multiple states
    const [name, setName] = useState('')
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
        if (isSuccess) {
            setName('')
            setEmail('')
            setPassword('')
            setRole('user')
            navigate('/admin/users')
        }
    }, [isSuccess, navigate])

    const onNameChange = (e) => setName(e.target.value)
    const onEmailChange = (e) => setEmail(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)
    const onRoleChange = (e) => {
        // get the correct value from the select element
        const value = e.target.selectedOptions
        setRole(value)
    }

    const canCreate = () => validName && validEmail && validPassword && !isLoading

    const onCreateClicked = async (e) => {
        e.preventDefault()

        if (canCreate()) {
            addNewUser({ name, email, password, role })
        }
    }

    const options = ["user", "admin"].map(role => {
        return (
            <option
                key={role}
                value={role}
            >
                {role}
            </option>
        )
    })

    return (
        <form onSubmit={onCreateClicked}>
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

            <button
                type="submit"
                disabled={!canCreate()}
            >
                Submit
            </button>
        </form>
    );
}