import express from 'express'
import { authenticate, authorizeJobseeker, findListingOwner, authorizeApplicationOwner, authorizeApplicationReviewer } from '../middleware/authorization.js'
import { ApplicationModel } from '../models/application.js'

const router = express.Router()

// CREATE: Create a new job application
router.post('/', authenticate, authorizeJobseeker, findListingOwner, async (req, res) => {
    try {
        const { listing } = req.body
        const newJobApplication = { 
            listing, 
            applicant: res.locals.user,
            company: res.locals.company }
        const insertedApplication = await ApplicationModel.create(newJobApplication)
        return res.status(201).send(await insertedApplication
            .populate([
                { path: 'applicant', select: ['name', 'email'] },
                { path: 'listing', select: 'title' },
                { path: 'company', select: 'company' }])
)}
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

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

// READ: Get all applications for logged in jobseeker, or logged in employer
router.get('/dashboard', authenticate, async (req, res) => {
    try {
        console.log(res.locals.user)
        if (!res.locals.user) {
            return res.status(403).send({ error: 'Please login' })
        }
        if (!res.locals.user.isEmployer) {
        res.send(await ApplicationModel
        .find( { applicant: res.locals.user})
        .populate([
            { path: 'applicant', select: ['name', 'email'] },
            { path: 'listing', select: 'title', populate: 
                    { path: 'company', select: 'company' }}])
    )} else {
        console.log(res.locals.user)
        res.send(await ApplicationModel
            .find( { company: res.locals.user })
            .populate([
                { path: 'applicant', select: ['name', 'email'] },
                { path: 'listing', select: 'title' },
                { path: 'company', select: 'company'}
            ])
    )}}
    catch (err) {
        return res.status(500).send({ error: err.message })
    }
})


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

// UPDATE: Update application status
router.put('/:id', authenticate, authorizeApplicationReviewer, async (req, res) => {
    const { status } = req.body
    const newApplication = { status }

    try {
        const application = await ApplicationModel.findByIdAndUpdate(req.params.id, newApplication, { returnDocument: 'after' })
        if (application) {
            res.send(application)
        } else {
            res.status(404).send({ error: 'Application not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// DELETE: Delete a job application
router.delete('/:id', authenticate, authorizeApplicationOwner, async (req, res) => {
    try{
        const application = await ApplicationModel.findByIdAndDelete(req.params.id)
        if (application) {
            return res.status(204).send({ message: 'Application deleted successfully'})
        } else {
            return res.status(404).send({ error: 'Job listing not found!' })
        }
    }
    catch (err) {
        return res.status(500).send({ error: err.message})
    }
})

export default router