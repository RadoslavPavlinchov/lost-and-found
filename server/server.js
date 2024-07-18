import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import itemsRoutes from "./routes/items.js"

const app = express()

app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/items", itemsRoutes)

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" })

})

export default app