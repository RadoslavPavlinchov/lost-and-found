import styles from './Auth.module.css';

export default function Register() {
    return (
        <div className={styles.auth}>
            <h2>Register</h2>
            <form>
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}