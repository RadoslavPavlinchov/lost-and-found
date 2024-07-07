import express from 'express';
import { createUser } from "../controllers/userController.js";

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
router.post("/", createUser);

// update user
router.patch("/:id", (req, res) => {
    res.send("update user");
});

// delete user
router.delete("/:id", (req, res) => {
    res.send("delete user");
});

export default router; 