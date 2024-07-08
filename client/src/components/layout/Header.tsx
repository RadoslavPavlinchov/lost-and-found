import styles from './Header.module.css';
import Navbar from './Navbar';

export default function Header({ setCurrentPage }) {
    return (
        <header className={styles.header}>
            <h1>App header</h1>

            <Navbar setCurrentPage={setCurrentPage} />
        </header>
    )
}