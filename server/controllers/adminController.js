import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import Item from "../models/Item.js"

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").lean()

        if (!users?.length) {
            return res.status(400).json({ msg: "No users available" })
        }

        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

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
        const { id, name, email, password, role } = req.body

        if (!mongoose.Types.ObjectId.isValid(req.id)) {
            return res.status(404).json({ msg: "Invalid ID", id: req.id })
        }

        const user = await User.findById({ _id: id }).exec()

        if (!user) {
            return res.status(404).json({ msg: "No such user", id })
        }

        const existingEmail = await User.findOne({ email }).lean().exec()

        if (existingEmail && existingEmail?._id.toString() !== id) {
            return res
                .status(409)
                .json({ msg: "User with such email already exist!" })
        }

        user.name = name
        user.role = role
        user.email = email

        if (password) {
            user.password = await bcrypt.hash(password, 10)
        }

        const updatedUser = await user.save()

        res.status(200).json(updatedUser)
    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(req.id)) {
            return res.status(404).json({ msg: "Incorrect ID", id: req.id })
        }

        res.status(404).json({ msg: error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body

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

        res.json({ msg: `User with ${id} was deleted` })
    } catch (error) {
        res.status(500).json({
            msg: "An error occurred while deleting the user",
        })
    }
}

export { getAllUsers, getUser, createUser, updateUser, deleteUser }
