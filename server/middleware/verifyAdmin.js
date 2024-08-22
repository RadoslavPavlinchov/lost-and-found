import jwt from "jsonwebtoken"
import User from "../models/User.js"

const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied." })
    }

    const token = authHeader.split(" ")[1]

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    msg: "Token verification failed, authorization denied.",
                })
            }

            if (user.userInfo.role !== "admin") {
                return res.status(403).json({
                    msg: "You are not an admin, authorization denied.",
                })
            }

            req.userInfo = user.userInfo

            next()
        })
    } catch (error) {
        res.status(401).json({
            msg: "Token verification failed, authorization denied.",
        })
    }
}

export default verifyAdmin
