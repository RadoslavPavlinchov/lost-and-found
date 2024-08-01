import jwt from "jsonwebtoken"

const verifyJWT = (req, res, next) => {
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

            req.id = user.userInfo.id
            req.email = user.userInfo.email
            req.name = user.userInfo.name
            req.role = user.userInfo.role

            next()
        })
    } catch (error) {
        res.status(401).json({
            msg: "Token verification failed, authorization denied.",
        })
    }
}

export default verifyJWT
