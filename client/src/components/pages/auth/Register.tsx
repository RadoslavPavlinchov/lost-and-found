import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../../app/api/authApiSlice"
import { setCredentials } from "../../../app/api/authSlice"
import Button from "../../common/Button"
import ShowError from "../../common/ShowError"
import {
    validateEmail,
    validatePasswordLength,
    validatePasswordSpecialChar,
    validateUsername,
} from "../../../utils/validation"

export default function Register() {
    const nameRef = useRef()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        nameRef?.current?.focus()
    }, [])

    useEffect(() => {
        setErrorMsg("")
    }, [formData])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateEmail(formData.email)) {
            return setErrorMsg("Please enter a valid email address")
        }

        if (!validateUsername(formData.name)) {
            return setErrorMsg(
                "Username must be between 3 and 20 characters long"
            )
        }

        if (!validatePasswordLength(formData.password)) {
            return setErrorMsg("Password must be at least 6 characters long")
        }

        if (!validatePasswordSpecialChar(formData.password)) {
            return setErrorMsg(
                "Password must contain at least one special character"
            )
        }

        try {
            const { accessToken } = await register(formData).unwrap()

            dispatch(setCredentials({ accessToken }))

            setFormData({
                name: "",
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
            [e.target.name]: e.target.value.trim(),
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

                <h2 className="text-center my-7">Register</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        className="border rounded-xl p-2 focus:outline-none"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        ref={nameRef}
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <input
                        className="border rounded-xl p-2 focus:outline-none"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <input
                        className="border rounded-xl  p-2 focus:outline-none"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        value={formData.password}
                    />

                    <Button label="Register" type="submit" />
                </form>

                <div className="flex justify-center gap-2 p-2 mt-4">
                    <p>Already have an account?</p>
                    <Link to="/login">
                        <span className="text-blue">Login</span>
                    </Link>
                </div>
            </>
        )
    }

    return <div className="max-w-md min-h-screen mx-auto mt-20">{content}</div>
}
