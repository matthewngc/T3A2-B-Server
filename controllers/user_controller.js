import { UserModel } from "../models/user.js"

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, company, password, isEmployer } = req.body
        const newUser = { name, email, company, password, isEmployer }
        const insertedUser = await UserModel.create(newUser)
        res.status(201).send(await insertedUser.populate())
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

// Get all users
export const getAllUsers = async (req, res) => {
    res.send(await UserModel.find().populate())
}

// Get one user by ID
export const getOneUserByID = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate()
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({ error: 'User not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

// Update user details
export const updateUser = async (req, res) => {
    const { name, email, company, password, isEmployer } = req.body
    const newUser = { name, email, company, password, isEmployer }

    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, newUser, { returnDocument: 'after' }).populate()
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({ error: 'User not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

// Delete user
export const deleteUser = async (req, res) => {
    try{
        const user = await UserModel.findByIdAndDelete(req.params.id)
        if (user) {
            res.status(204).send({ message: 'User deleted'})
        } else {
            res.status(404).send({ error: 'User not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message})
    }
}