import express from 'express';
import usersRoutes from "./routes/users.js";

const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });

})

export default app;