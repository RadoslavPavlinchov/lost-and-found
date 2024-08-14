import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../../app/api/authApiSlice"
import { setCredentials } from "../../../app/api/authSlice"
import Button from "../../common/Button"

export default function Register() {
    const nameRef = useRef()
    const errorRef = useRef()

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
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMsg("")
    }, [formData])

    const handleSubmit = async (e) => {
        e.preventDefault()

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

            errorRef.current.focus()
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-md mx-auto">
            <p ref={errorRef}>{errorMsg}</p>

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
        </div>
    )
}
