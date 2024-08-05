import mongoose from "mongoose"
import Item from "../models/Item.js"

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find({})

        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const getUserItems = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({ msg: "ID is required" })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Invalid ID", id })
        }

        const items = await Item.find({ userRef: id }).lean().exec()

        if (!items) {
            return res.status(404).json({ msg: "No items found", id })
        }

        res.status(200).json(items)
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

const getItem = async (req, res) => {
    const { id } = req.params

    try {
        const item = await Item.findById(id)

        if (!item) {
            return res.status(404).json({ error: "No such item", id })
        }

        res.status(200).json(item)
    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid ID", id })
        }

        res.status(404).json({ error })
    }
}

const createItem = async (req, res) => {
    const {
        name,
        description,
        // dateOfEvent,
        location,
        status,
        category,
        userRef,
        imageUrls,
    } = req.body

    try {
        const item = await Item.create({
            name,
            description,
            // dateOfEvent,
            location,
            status,
            category,
            // user: new mongoose.Types.ObjectId(user._id), // Convert user ID to ObjectId
            userRef,
            imageUrls,
        })

        res.status(201).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateItem = async (req, res) => {
    const { id } = req.params

    try {
        const item = await Item.findOneAndUpdate(
            { _id: id },
            {
                ...req.body,
            }
        )

        if (!item) {
            return res.status(404).json({ error: "No such item", id })
        }

        res.status(200).json(item)
    } catch {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Incorrect ID", id })
        }

        res.status(404).json({ error })
    }
}

const deleteItem = async (req, res) => {
    const { id } = req.params

    try {
        // Two cases:
        // 1. The current user is admin and can delete all items
        // 2. The current user is the owner of the item and can delete only their items

        const item = await Item.findOneAndDelete({ _id: id })

        if (!item) {
            return res.status(404).json({ error: "No such item", id })
        }

        res.status(200).json(item)
    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Incorrect ID", id })
        }

        res.status(404).json({ error })
    }
}

export {
    getAllItems,
    getUserItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
}
