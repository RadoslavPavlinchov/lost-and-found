const corsOptions = {
    origin: (origin, callback) => {
        if (origin === "http://localhost:5173" || origin === "http://localhost:3000") {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions