const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"]

const corsOptions = {
    origin: (origin, callback) => {
        // const isTrustedClient = (req) => {
        //     return req.headers["x-postman-request"] === "true"
        // }
        // isTrustedClient(req)

        if (allowedOrigins.includes(origin) || origin === undefined) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

export default corsOptions
