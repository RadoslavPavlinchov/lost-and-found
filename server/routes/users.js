import express from "express"
import {
    getUser,
    getUserItems,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js"
import verifyJWT from "../middleware/verifyJWT.js"

const router = express.Router()

router.use(verifyJWT)

router.get("/items", getUserItems)
router.get("/:id", getUser)
router.post("/", createUser)
router.patch("/", updateUser)
router.delete("/", deleteUser)

export default router
