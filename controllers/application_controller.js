import { ApplicationModel } from "../models/application.js"

// Create new job application
export const createApplication = async (req, res) => {
    try {
        const { listing } = req.body
        const newJobApplication = { 
            listing, 
            applicant: res.locals.user,
            // title:
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
}

// Get all job applications
export const getApplicationsAll = async (req, res) => {
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
}

// Get all job applications for logged in jobseeker or logged in employer
export const getApplicationsDashboard = async (req, res) => {
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
}

// Get one job application by ID
export const getApplicationByID = async (req, res) => {
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
}

// Update job application status (listing owner only)
export const updateApplicationStatus = async (req, res) => {
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
}

// Delete job application
export const deleteApplication = async (req, res) => {
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
}