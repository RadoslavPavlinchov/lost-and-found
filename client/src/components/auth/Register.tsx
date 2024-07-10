import { FormEvent } from 'react';
import styles from './Auth.module.css';

export default function Register() {
    const baseUrl = "http://localhost:3000/api/"

    const onRegisterHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData)

        await fetch(`${baseUrl}users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
    }

    return (
        <div className={styles.auth}>
            <h2>Register</h2>
            <form onSubmit={onRegisterHandler}>
                <input type="text" placeholder="Name" name="name" required />
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}