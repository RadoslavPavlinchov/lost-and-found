import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import Layout from "./components/layout/Layout"
import routesConfig from "./configs/routesConfig"
import { itemsApiSlice } from "./app/api/itemsApiSlice"
import { PersistGate } from "redux-persist/es/integration/react"

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
    const items = store.dispatch(itemsApiSlice.endpoints.getItems.initiate())

    console.log("ITEMS INIT", items)

    return (
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            {createRoutes(routesConfig)}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </PersistGate>
    )
}
