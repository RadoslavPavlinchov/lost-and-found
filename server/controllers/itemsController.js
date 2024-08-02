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

export { getAllItems, getItem, createItem, updateItem, deleteItem }
