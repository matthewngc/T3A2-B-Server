import { UserModel } from '../models/user.js'
import express from 'express'

const router = express.Router()

// Get all users
router.get('/', async (req, res) => res.send(await UserModel.find().populate()))

// Get one user
router.get('/:id', async (req, res) => {
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
})

// Create user
router.post('/', async (req, res) => {
    try {
        const { name, email, company, password, isEmployer } = req.body
        const newUser = { name, email, company, password, isEmployer }
        const insertedUser = await UserModel.create(newUser)
        res.status(201).send(await insertedUser.populate())
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Update user
router.put('/:id', async (req, res) => {
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
})

// Delete user
router.delete('/:id', async (req, res) => {
    try{
        const user = await UserModel.findByIdAndDelete(req.params.id)
        if (user) {
            res.status(204)
        } else {
            res.status(404).send({ error: 'User not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message})
    }
})

export default router