import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { setCredentials } from "../../../app/api/authSlice"
import { useLoginMutation } from "../../../app/api/authApiSlice"

import styles from "./Auth.module.css"

export default function Login() {
    const emailRef = useRef()
    const errorRef = useRef()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { accessToken } = await login({ email, password }).unwrap()

            dispatch(setCredentials({ accessToken }))

            setEmail("")
            setPassword("")

            navigate("/")
        } catch (error) {
            if (!error.status) {
                return setErrMsg("Network error")
            }

            if (error.status === 400) {
                return setErrMsg("Invalid credentials")
            }

            if (error.status === 401) {
                return setErrMsg("Unauthorized")
            }

            setErrMsg(error.data?.message)

            errorRef.current.focus()
        }

    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className={styles.auth}>
            <h2>Login</h2>

            <p ref={errorRef}>{errMsg}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        ref={emailRef}
                        onChange={handleEmailInput}
                        placeholder="Email"
                        autoComplete="email" // off
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordInput}
                        placeholder="Password"
                        required
                    />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
}