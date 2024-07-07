import express from 'express';

const router = express.Router();

// get all users 
router.get("/", (req, res) => {
    res.send("get all users");
});

// get user by id
router.get("/:id", (req, res) => {
    res.send("get specific user by id");
});

// create new user
router.post("/", (req, res) => {
    res.send("create new user");
});

// update user
router.patch("/:id", (req, res) => {
    res.send("update user");
});

// delete user
router.delete("/:id", (req, res) => {
    res.send("delete user");
});

export default router; 