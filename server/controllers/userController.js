import mongoose from "mongoose";
import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "No such user", id })
        }

        res.status(200).json(user);

    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid ID", id })
        }

        res.status(404).json({ error })
    }
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password
        });

        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndUpdate({ _id: id }, {
            ...req.body
        });

        if (!user) {
            return res.status(404).json({ error: "No such user", id });
        }

        res.status(200).json(user);
    } catch {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Incorrect ID", id });
        }

        res.status(404).json({ error });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndDelete({ _id: id });

        if (!user) {
            return res.status(404).json({ error: "No such user", id });
        }

        res.status(200).json(user);

    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Incorrect ID", id });
        }

        res.status(404).json({ error });
    }
}

export {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
