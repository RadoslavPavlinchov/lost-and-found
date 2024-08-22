import express from "express"
import {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js"
import verifyJWT from "../middleware/verifyJWT.js"
import verifyAdmin from "../middleware/verifyAdmin.js"

const router = express.Router()

router.use(verifyJWT)

router.get("/", verifyAdmin, getAllUsers)

router.get("/:id", getUser)
router.post("/", createUser)
router.patch("/", updateUser)
router.delete("/", deleteUser)

export default router
