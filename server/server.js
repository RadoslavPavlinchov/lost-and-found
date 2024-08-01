import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import corsOptions from "./config/corsOptions.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import adminRoutes from "./routes/admin.js"
import itemsRoutes from "./routes/items.js"

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/items", itemsRoutes)

app.use("*", (req, res) => {
    res.status(404).json({ error: "not found" })
})

export default app
