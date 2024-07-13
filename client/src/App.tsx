import { Routes, Route } from "react-router-dom"
import styles from "./App.module.css"

import routesConfig from "./configs/routesConfig"

import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

function App() {
	return (
		<div className={styles.app}>

			<Header />

			<main>

				<Routes>
					{
						routesConfig.map(route => {
							return (
								<Route
									key={route.key}
									path={route.path}
									element={
										<
											route.element
										/>
									}
								/>
							)
						})
					}
				</Routes>

			</main>

			<Footer />

		</div>
	)
}

export default App
