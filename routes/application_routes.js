import express from 'express'
import { ApplicationModel } from '../models/application.js'

const router = express.Router()

// READ: Get all applications
router.get('/', async (req, res) => {
    try {
        res.send(await ApplicationModel
        .find()
        .populate([
            { path: 'applicant', select: ['name', 'email'] },
            { path: 'listing', select: 'title', populate: 
                    { path: 'company', select: 'company' }}])
    )}
    catch (err) {
        return res.status(500).send({ error: err.message })
    }
})

// READ: Get all applications that a jobseeker has applied for

// READ: Get one application
router.get('/:id', async (req, res) => {
    try {
        const application = await ApplicationModel
            .findById(req.params.id)
            .populate([
                { path: 'applicant', select: ['name', 'email'] },
                { path: 'listing', select: 'title', populate: 
                    { path: 'company', select: 'company'}}])
        if (application) {
            res.send(application)
        } else {
            res.status(404).send({ error: 'Job application not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// CREATE: Create a new job application
router.post('/', async (req, res) => {
    try {
        const { listing, applicant } = req.body
        const newJobApplication = { listing, applicant }
        const insertedApplication = await ApplicationModel.create(newJobApplication)
        return res.status(201).send(await insertedApplication
            .populate([
                { path: 'applicant', select: ['name', 'email'] },
                { path: 'listing', select: 'title', populate: 
                    { path: 'company', select: 'company'}}])
)}
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// DELETE: Delete a job application
router.delete('/:id', async (req, res) => {
    try{
        const application = await ApplicationModel.findByIdAndDelete(req.params.id)
        if (application) {
            res.status(204)
        } else {
            res.status(404).send({ error: 'Job listing not found!' })
        }
    }
    catch (err) {
        res.sendStatus(500).send({ error: err.message})
    }
})

export default router