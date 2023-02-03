import express from 'express'
import { authenticate, authorizeJobseeker } from '../middleware/authorization.js'
import { ApplicationModel } from '../models/application.js'

const router = express.Router()

// Read all applications that the logged in user (jobseeker) has submitted
router.get('/', authenticate, authorizeJobseeker, async (req, res) => {
    try {
        res.send(await ApplicationModel
        .find( { applicant: res.locals.user})
        .populate([
            { path: 'applicant', select: ['name', 'email'] },
            { path: 'listing', select: 'title', populate: 
                    { path: 'company', select: 'company' }}])
    )}
    catch (err) {
        return res.status(500).send({ error: err.message })
    }
})

// Read all applications that the logged in user (employer) has received for their listings
router.get('/', authenticate, async (req, res) => {
    res.send(await ApplicationModel
        .find( { 'listing.company': res.locals.user })
        .populate([
            { path: 'applicant', select: ['name', 'email']}
        ])
        )
    })

export default router