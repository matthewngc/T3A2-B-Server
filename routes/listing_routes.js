import express from 'express'
import { ListingModel } from '../models/listing.js'
import { authenticate, authorizeEmployer, authorizeListingOwner } from '../middleware/authorization.js'

const router = express.Router()

// CREATE: Post job listing
router.post('/', authenticate, authorizeEmployer, async (req, res) => {
    try {
        const { title, description, education, experience } = req.body
        const newJobListing = { title, description, company: req.user.id, education, experience }
        const insertedListing = await ListingModel.create(newJobListing)
        res.status(201).send(await insertedListing.populate({ path: 'company', select: 'company'}))
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// READ: Get all job listings
router.get('/', async (req, res) => res.send(await ListingModel.find().populate({path: 'company', select: 'company'})))

// READ: Get one job listing by ID
router.get('/:id', async (req, res) => {
    try {
        const listing = await ListingModel.findById(req.params.id).populate({path: 'company', select: 'company'})
        console.log(listing)
        if (listing) {
            res.send(listing)
        } else {
            res.status(404).send({ error: 'Job listing not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// UPDATE: update job listing
router.put('/:id', authenticate, authorizeListingOwner, async (req, res) => {
    const { title, description, education, experience } = req.body
    const newJobListing = { title, description, education, experience }

    try {
        const listing = await ListingModel.findByIdAndUpdate(req.params.id, newJobListing, { returnDocument: 'after' }).populate({ path: 'company', select: 'company'})
        if (listing) {
            res.send(listing)
        } else {
            res.status(404).send({ error: 'Job listing not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// DELETE: delete job listing
router.delete('/:id', authenticate, authorizeListingOwner, async (req, res) => {
    try{
        const listing = await ListingModel.findByIdAndDelete(req.params.id)
        if (listing) {
            // res.send(204).send({ message: 'Job listing deleted successfully!'})
            res.status(204)
        // } else {
            // res.sendStatus(404).send({ error: 'Job listing not found!' })
        } else {
            res.status(404).send({ error: 'Job listing not found!' }) // not working for some reason - check later
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message})
    }
})

export default router