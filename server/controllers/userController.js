import User from "../models/userModel.js";

// get all users

// get user by id

// create new user
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

// update user

// delete user

export {
    createUser
}
