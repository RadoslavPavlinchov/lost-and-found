import Admin from "../components/pages/admin/Admin";
import AdminUsers from "../components/pages/admin/AdminUsers";
import AdminItems from "../components/pages/admin/AdminItems";
import Login from "../components/pages/auth/Login";
import Register from "../components/pages/auth/Register";
import Home from "../components/pages/home/Home";
import Items from "../components/pages/items/Items";
import ItemDetails from "../components/pages/items/ItemDetails";
import NotFound from "../components/pages/notFound/NotFound";

// To-Do: add aditional property called "additionalProps" or "props" if needed

const routesConfig = [
    {
        key: "home",
        element: Home,
        path: "/",
    },
    {
        key: "items",
        element: Items,
        path: "items"
    },
    {
        key: "/items/:id",
        element: ItemDetails,
        path: "items/:id"
    },
    // {
    //     element: "About Us",
    //     path: "/about"
    // },
    // {
    //     element: "Contacts",
    //     path: "/contacts"
    // },
    {
        key: "admin",
        element: Admin,
        path: "admin",
        children: [
            {
                key: "admin-users",
                element: AdminUsers,
                path: "users",
            },
            {
                key: "admin-items",
                element: AdminItems,
                path: "items",
            }
        ]
    },
    {
        key: "register",
        element: Register,
        path: "register",
    },
    {
        key: "login",
        element: Login,
        path: "login",
    },
    {
        key: "not-found",
        element: NotFound,
        path: "*"
    },

];

export default routesConfig;