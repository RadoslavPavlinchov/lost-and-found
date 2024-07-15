import styles from "./Footer.module.css"

export default function Foooter() {
    return (
        <footer className={styles.footer}>
            <p>Made with &hearts; by <a href="https://github.com/RadoslavPavlinchov">Radoslav Pavlinchov</a></p>
        </footer>
    );
}