import Header from "./components/layout/Header"
import styles from "./App.module.css"
import Home from "./components/pages/Home"

import { useState } from "react"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Footer from "./components/layout/Footer"

function App() {
	const [currentPage, setCurrentPage] = useState("home")

	function showPage(): JSX.Element {
		if (currentPage === "home") {
			return <Home />
		}

		if (currentPage === "login") {
			return <Login />
		}

		if (currentPage === "register") {
			return <Register />
		}

		return <Home />
	}

	return (
		<div className={styles.app}>
			<Header setCurrentPage={setCurrentPage} />
			<main>{showPage()}</main>
			<Footer />
		</div>
	)
}

export default App
