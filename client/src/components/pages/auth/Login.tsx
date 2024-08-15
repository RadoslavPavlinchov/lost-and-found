import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { setCredentials } from "../../../app/api/authSlice"
import { useLoginMutation } from "../../../app/api/authApiSlice"
import {
    validateEmail,
    validatePasswordLength,
} from "../../../utils/validation"
import Button from "../../common/Button"
import ShowError from "../../common/ShowError"

export default function Login() {
    const emailRef = useRef()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        emailRef?.current?.focus()
    }, [])

    useEffect(() => {
        setErrorMsg("")
    }, [formData])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateEmail(formData.email)) {
            return setErrorMsg("Please enter a valid email address")
        }

        if (!validatePasswordLength(formData.password)) {
            return setErrorMsg("Password must be at least 6 characters long")
        }

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
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim(),
        })
    }

    let content

    if (isLoading) {
        content = (
            <div className="text-2xl font-bold text-gray-600 text-center">
                Loading...
            </div>
        )
    } else {
        content = (
            <>
                {errorMsg && <ShowError errorMsg={errorMsg} />}

                <h2 className="text-center my-7">Login</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        className="border rounded-xl p-2 focus:outline-none"
                        type="email"
                        id="email"
                        value={formData.email}
                        ref={emailRef}
                        onChange={handleChange}
                        placeholder="Email"
                    />

                    <input
                        className="border rounded-xl p-2 focus:outline-none"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />

                    <Button label="Login" type="submit" />

                    <div className="flex justify-center gap-2 p-2 mt-4">
                        <p>Don't have an account yet?</p>
                        <Link to="/register">
                            <span className="text-blue">Register</span>
                        </Link>
                    </div>
                </form>
            </>
        )
    }

    return <div className="max-w-md min-h-screen mx-auto mt-20">{content}</div>
}
