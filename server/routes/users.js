import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.use(verifyJWT);

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/", deleteUser);

export default router; 