import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { setCredentials } from "../../../app/api/authSlice"
import { useLoginMutation } from "../../../app/api/authApiSlice"

export default function Login() {
    const emailRef = useRef()
    const errorRef = useRef()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMsg("")
    }, [formData])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { accessToken } = await login(formData).unwrap()

            dispatch(setCredentials({ accessToken }))

            setFormData({
                email: "",
                password: "",
            })

            navigate("/")
        } catch (error) {
            if (!error.status) {
                return setErrorMsg("Network error")
            }

            if (error.status === 400) {
                return setErrorMsg("Invalid credentials")
            }

            if (error.status === 401) {
                return setErrorMsg("Unauthorized")
            }

            setErrorMsg(error.data?.message)

            errorRef.current.focus()
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-md mx-auto">
            <p ref={errorRef}>{errorMsg}</p>

            <h2 className="text-center my-7">Login</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    className="border rounded-xl p-2"
                    type="email"
                    id="email"
                    value={formData.email}
                    ref={emailRef}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />

                <input
                    className="border rounded-xl p-2"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <button
                    className="bg-blue text-white rounded-xl p-2"
                    type="submit"
                >
                    Login
                </button>

                <div className="flex justify-center gap-2 p-2 mt-4">
                    <p>Don't have an account yet?</p>
                    <Link to="/register">
                        <span className="text-blue">Register</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}
