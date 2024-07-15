import styles from './Header.module.css';
import Navbar from './Navbar';

export default function Header() {
    return (
        <header className={styles.header}>
            <Navbar />
            <h1>Lost And Found Platform</h1>
        </header>
    )
}