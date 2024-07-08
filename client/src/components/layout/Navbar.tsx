import styles from "./Navbar.module.css"

export default function Navbar({ setCurrentPage }) {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink} onClick={() => setCurrentPage("home")}>Home</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>Items</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>About Us</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>Contacts</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink} onClick={() => setCurrentPage("register")}>Register</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink} onClick={() => setCurrentPage("login")}>Login</a>
                </li>
            </ul>
        </nav >
    )
}