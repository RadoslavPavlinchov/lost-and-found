const navigationConfig = [
    // { text: "L&F", to: "/" },
    {
        text: "Home",
        to: "/",
        visibility: {
            private: ["user", "admin"],
            public: true,
        },
    },
    {
        text: "Items",
        to: "/items",
        visibility: {
            private: ["user", "admin"],
            public: true,
        },
    },
    {
        text: "About Us",
        to: "/aboutUs",
        visibility: {
            private: [],
            public: true,
        },
    },
    {
        text: "Contacts",
        to: "/contacts",
        visibility: {
            private: [],
            public: true,
        },
    },
    {
        text: "Admin",
        to: "/admin",
        visibility: {
            private: ["admin"],
            public: false,
        },
    },
    // {
    //     text: "Register",
    //     to: "/register",
    //     visibility: {
    //         private: [],
    //         public: true
    //     }
    // },
    // {
    //     text: "Login",
    //     to: "/login",
    //     visibility: {
    //         private: [],
    //         public: true
    //     }
    // },
]

export default navigationConfig
