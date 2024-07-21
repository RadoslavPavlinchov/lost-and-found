import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered." })
        }

        const user = await User.findOne({ email }).exec()

        if (!user) {
            return res.status(400).json({ msg: "No account with this email has been registered." })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." })
        }

        const accessToken = jwt.sign(
            {
                'userInfo': {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "10s"
            }
        )

        const refreshToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1m"
            }
        )

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ accessToken })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

const logout = async (req, res) => {
    try {
        const cookies = req.cookies

        if (!cookies?.jwt) {
            return res.status(204).json({ msg: "No content" })
        }

        res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" })

        res.json({ msg: "Logged out" })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

const refresh = async (req, res) => {
    try {
        const cookies = req.cookies

        if (!cookies.jwt) {
            return res.status(401).json({ msg: "Unauthorized" })
        }

        const refreshToken = cookies.jwt

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (error, user) => {
                if (error) {
                    return res.status(403).json({ msg: "Forbidden" })
                }

                const foundUser = await User.findById(user.id).exec()

                if (!foundUser) {
                    return res.status(404).json({ msg: "User not found" })
                }

                const accessToken = jwt.sign(
                    {
                        'userInfo': {
                            id: foundUser._id,
                            email: foundUser.email,
                            name: foundUser.name,
                            role: foundUser.role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "10s"
                    }
                )

                res.json({ accessToken })
            })

    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export {
    login,
    logout,
    refresh
}
