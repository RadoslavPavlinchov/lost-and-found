import express from 'express';

const app = express();

app.get("/", (req, res) => {
  res.send("home page");
});


app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });

})

export default app;