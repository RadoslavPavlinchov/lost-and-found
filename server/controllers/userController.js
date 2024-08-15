import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import Item from "../models/Item.js"

const getUser = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ msg: "ID is required" })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Invalid ID", id })
        }

        const user = await User.findById(id).select("-password").exec()

        if (!user) {
            return res.status(404).json({ msg: "No such user", id })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password || !role) {
            return res.status(400).json({ msg: "All fields are required!" })
        }

        const existingEmail = await User.findOne({ email }).lean().exec()

        if (existingEmail) {
            return res.status(409).json({ msg: "Email is already taken" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            role,
            password: hashPassword,
        })

        if (user) {
            res.status(200).json({ msg: `User ${name} created!` })
        } else {
            res.status(400).json({ msg: "Unable to create new user" })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!mongoose.Types.ObjectId.isValid(req.id)) {
            return res.status(404).json({ msg: "Invalid ID", id: req.id })
        }

        if (password) {
            req.body.password = await bcrypt.hash(password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.id,
            {
                $set: {
                    name: name,
                    email: email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            {
                new: true,
            }
        )

        const { password: pass, ...rest } = updatedUser._doc

        const accessToken = jwt.sign(
            {
                userInfo: {
                    id: rest._id,
                    email: rest.email,
                    name: rest.name,
                    role: rest.role,
                    avatar: rest.avatar,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        )
        const refreshToken = jwt.sign(
            {
                id: rest._id,
                email: rest.email,
                name: rest.name,
                role: rest.role,
                avatar: rest.avatar,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d",
            }
        )
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({ accessToken })
    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(req.id)) {
            return res.status(404).json({ msg: "Incorrect ID", id: req.id })
        }
        res.status(404).json({ error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.id

        if (!id) {
            return res.status(400).json({ msg: "User ID is required" })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid ID", id })
        }

        const items = await Item.findOne({ user: id }).lean().exec()

        if (items?.length) {
            return res
                .status(400)
                .json({ msg: "User has items that are still active" })
        }

        const user = await User.findById({ _id: id }).exec()

        if (!user) {
            return res.status(404).json({ msg: "No such user", id })
        }

        await user.deleteOne()

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        })

        res.json({ msg: `User with ${id} was deleted` })
    } catch (error) {
        res.status(500).json({
            msg: "An error occurred while deleting the user",
        })
    }
}

export { getUser, createUser, updateUser, deleteUser }
