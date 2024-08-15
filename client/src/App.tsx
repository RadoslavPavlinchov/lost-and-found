import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import Layout from "./components/layout/Layout"
// import routesConfig from "./configs/routesConfig"
import { itemsApiSlice } from "./app/api/itemsApiSlice"
import { PersistGate } from "redux-persist/es/integration/react"
import Home from "./components/pages/home/Home"
import Items from "./components/pages/items/Items"
import ItemDetails from "./components/pages/items/ItemDetails"
import AboutUs from "./components/pages/aboutUs/AboutUs"
import Contacts from "./components/pages/contacts/Contacts"
import Register from "./components/pages/auth/Register"
import Login from "./components/pages/auth/Login"
import PrivateRoute from "./components/common/PrivateRoute"
import Profile from "./components/pages/profile/Profile"
import CreateItem from "./components/pages/items/CreateItem"
import EditItem from "./components/pages/items/EditItem"
import MyItems from "./components/pages/items/MyItems"
import NotFound from "./components/pages/notFound/NotFound"
import AdminUsers from "./components/pages/admin/AdminUsers"
import AdminEditUser from "./components/pages/admin/AdminEditUser"
import AdminCreateUser from "./components/pages/admin/AdminCreateUser"
import AdminItems from "./components/pages/admin/AdminItems"
import Dashboard from "./components/pages/dashboard/Dashboard"
import Admin from "./components/pages/admin/Admin"
import AdminPrivateRoute from "./components/common/AdminPrivateRoute"
import PublicRoute from "./components/common/PublicRoute"

// function createRoutes(routesConfig) {
//     return routesConfig.map((route) => {
//         if (route.children) {
//             return (
//                 <Route
//                     key={route.key}
//                     path={route.path}
//                     element={<route.element />}
//                 >
//                     {createRoutes(route.children)}
//                 </Route>
//             )
//         }

//         return (
//             <Route
//                 key={route.key}
//                 path={route.path}
//                 element={<route.element />}
//             />
//         )
//     })
// }

export default function App() {
    const items = store.dispatch(itemsApiSlice.endpoints.getItems.initiate())

    console.log("ITEMS INIT", items)

    return (
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route element={<Home />} path="/" />
                            <Route element={<Items />} path="items" />
                            <Route element={<ItemDetails />} path="items/:id" />
                            <Route element={<AboutUs />} path="aboutUs" />
                            <Route element={<Contacts />} path="contacts" />
                            {/* <Route element={<AdminPrivateRoute />} path="admin">
                                <Route element={<Admin />} path="">
                                    <Route
                                        element={<AdminUsers />}
                                        path="users"
                                    />
                                    <Route
                                        element={<AdminEditUser />}
                                        path="users/:id"
                                    />
                                    <Route
                                        element={<AdminCreateUser />}
                                        path="users/create"
                                    />
                                    <Route
                                        element={<AdminItems />}
                                        path="items"
                                    />
                                </Route>
                            </Route> */}
                            <Route element={<PublicRoute />} path="register">
                                <Route element={<Register />} path="" />
                            </Route>
                            <Route element={<PublicRoute />} path="login">
                                <Route element={<Login />} path="" />
                            </Route>
                            <Route element={<PrivateRoute />} path="dashboard">
                                <Route element={<Dashboard />} path="">
                                    <Route
                                        element={<Profile />}
                                        path="profile"
                                    />
                                    <Route
                                        element={<CreateItem />}
                                        path="create-item"
                                    />
                                    <Route
                                        element={<EditItem />}
                                        path="edit-item/:id"
                                    />
                                    <Route
                                        element={<MyItems />}
                                        path="my-items"
                                    />
                                    <Route
                                        element={<ItemDetails />}
                                        path="items/:id"
                                    />
                                </Route>
                            </Route>
                            <Route element={<NotFound />} path="*" />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </PersistGate>
    )
}
