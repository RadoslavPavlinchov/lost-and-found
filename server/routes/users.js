import express from "express"
import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js"
import verifyJWT from "../middleware/verifyJWT.js"

const router = express.Router()

router.use(verifyJWT)

router.get("/:id", getUser)
router.post("/", createUser)
router.patch("/", updateUser)
router.delete("/", deleteUser)

export default router
