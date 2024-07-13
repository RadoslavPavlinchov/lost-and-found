import styles from "./Auth.module.css"

export default function Login() {
    return (
        <div className={styles.auth}>
            <h2>Login</h2>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}