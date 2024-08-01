import jwt from "jsonwebtoken"

async function confirmAdminAccount(req, res) {
    const user = await User.findById({ _id: req.userInfo.id }).exec()

    if (!user) {
        return res.status(404).json({ msg: "No such user", id })
    }

    if (user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied" })
    }
}

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

            confirmAdminAccount(req, res)

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
