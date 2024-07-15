import { Outlet } from "react-router-dom"
import styles from "./Layout.module.css"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    return (
        <>
            <Header />
            <main className={styles.layout}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}