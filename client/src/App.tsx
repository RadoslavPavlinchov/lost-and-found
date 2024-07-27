import { Routes, Route, BrowserRouter } from "react-router-dom"
import routesConfig from "./configs/routesConfig"
import Layout from "./components/layout/Layout"
import { Provider } from "react-redux"
import { store } from "./app/store"

function createRoutes(routesConfig) {
    return routesConfig.map((route) => {
        if (route.children) {
            return (
                <Route
                    key={route.key}
                    path={route.path}
                    element={<route.element />}
                >
                    {route.children.map((child) => {
                        return (
                            <Route
                                key={child.key}
                                path={child.path}
                                element={<child.element />}
                            />
                        )
                    })}
                </Route>
            )
        }

        return (
            <Route
                key={route.key}
                path={route.path}
                element={<route.element />}
            />
        )
    })
}

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        {createRoutes(routesConfig)}
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
