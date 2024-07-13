import express from 'express';
import { createItem, deleteItem, getAllItems, getItem, updateItem } from "../controllers/itemsController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
