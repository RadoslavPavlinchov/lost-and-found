import express from "express"
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} from "../controllers/adminController.js"
import verifyAdmin from "../middleware/verifyAdmin.js"

const router = express.Router()

router.use(verifyAdmin)

router.get("/", getAllUsers)
router.get("/:id", getUser)
router.post("/", createUser)
router.patch("/", updateUser)
router.delete("/", deleteUser)

export default router
