import { UserModel } from "../models/user.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

// Access environment variables
dotenv.config()

// Register new user
export const registerUser = async (req, res) => {
    try {
        const { email, password, name, company, isEmployer } = req.body
        if (!(email && password) || isEmployer && !company || !isEmployer && !name) {
            return res.status(400).send({ error: 'Please enter all required fields.' })
        }
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(409).send({ error: 'User already exists - please log in.' })
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = await UserModel.create({
            name,
            company,
            isEmployer,
            email: email.toLowerCase(),
            password: encryptedPassword
        })
        const newToken = jwt.sign({
            id: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
        return res.status(201).send({
            id: newUser.id,
            name: newUser.name,
            company: newUser.company,
            email: newUser.email,
            isEmployer: newUser.isEmployer,
            token: newToken
    })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

// Login existing user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            res.status(400).send({ error: 'Please enter an email and password.' })
        }
        const user = await UserModel.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            const newToken = jwt.sign({
                id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
            return res.status(201).send({
                id: user.id,
                name: user.name,
                company: user.company,
                email: user.email,
                token: newToken,
                isEmployer: user.isEmployer            
        })
        } else {
            res.status(400).send( {error: 'Incorrect email or password.' })
        }
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}