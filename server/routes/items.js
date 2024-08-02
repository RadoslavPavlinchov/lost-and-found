import express from "express"
import {
    createItem,
    deleteItem,
    getAllItems,
    getItem,
    updateItem,
} from "../controllers/itemsController.js"
import verifyJWT from "../middleware/verifyJWT.js"

const router = express.Router()

router.get("/", getAllItems)
router.get("/:id", getItem)
router.post("/", verifyJWT, createItem)
router.patch("/:id", verifyJWT, updateItem)
router.delete("/:id", verifyJWT, deleteItem)

export default router
