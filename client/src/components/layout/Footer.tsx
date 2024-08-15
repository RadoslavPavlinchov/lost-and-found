import { Link } from "react-router-dom"
import styles from "./Footer.module.css"
import Logo from "./Logo"

export default function Foooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <Logo />
            </div>

            <div className={styles.middleColumn}>
                <p className={styles.singleLine}>
                    Made with &hearts; by{" "}
                    <a href="https://github.com/RadoslavPavlinchov">
                        Radoslav Pavlinchov
                    </a>
                </p>
            </div>

            <div className={styles.column}>
                <Link to="/aboutUs">About Us</Link>
                <Link to="/contacts">Contacts</Link>
            </div>
        </footer>
    )
}
