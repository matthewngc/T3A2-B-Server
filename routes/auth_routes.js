import express from 'express'
import dotenv from 'dotenv'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.js'
import jwt from 'jsonwebtoken'

dotenv.config()

// let encAlgorithm = 'aes-256-cbc'
// let encPrivateKey = crypto.scryptSync(process.env.ENC_Key, 'SpecialSalt', 42)
// let encIV = crypto.scryptSync(process.env.ENC_IV, 'SpecialSalt', 16)
// let cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV)
// let decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV)

// // Functions

// // Convert string into encrypted string
// function encryptString(data) {
//     return cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
// }

// // Convert encrypted data back into plaintext string
// function decryptString(data) {
//     return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
// }

// // Convert encrypted string into a regular JavaScript object
// function decryptObject(data) {
//     return JSON.parse(decryptString(data))
// }



const router = express.Router()

router.post('/register', async (req, res) => {
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
            email: newUser.email,
            isEmployer: newUser.isEmployer,
            token: newToken
    })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.post('/login', async (req, res) => {
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
                mobile: user.mobile,
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
})

export default router

