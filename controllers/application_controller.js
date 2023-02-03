import { ApplicationModel } from "../models/application.js"

// Create new job application
export const createApplication = async (req, res) => {
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
}