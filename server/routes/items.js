import express from "express"
import {
    getAllItems,
    getUserItems,
    getItem,
    createItem,
    deleteItem,
    updateItem,
} from "../controllers/itemsController.js"
import verifyJWT from "../middleware/verifyJWT.js"

const router = express.Router()

router.get("/", getAllItems)
router.get("/user/:id", getUserItems)
router.get("/:id", getItem)
router.post("/", verifyJWT, createItem)
router.patch("/:id", verifyJWT, updateItem)
router.delete("/:id", verifyJWT, deleteItem)

export default router
