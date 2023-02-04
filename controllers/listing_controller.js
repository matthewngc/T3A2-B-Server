import { ListingModel } from "../models/listing.js"

// Find the owner of the listing
export const findListingOwner = async (req, res, next) => {
    const { listing } = req.body
    const findListing = await ListingModel.findById(listing)
    console.log(listing)
    console.log(findListing)
    if (!findListing) {
        return res.status(404).send({ error: 'Listing not found'})
    }
    res.locals.company = findListing.company
    next()
}

// Create job listing
export const createJobListing = async (req, res) => {
    try {
        const { title, description, location, education, experience } = req.body
        const newJobListing = { title, description, company: res.locals.user.id, location, education, experience }
        const insertedListing = await ListingModel.create(newJobListing)
        res.status(201).send(await insertedListing.populate({ path: 'company', select: 'company'}))
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }        
}

// Get all job listings
export const getJobListingAll = async (req, res) => {
    try{
        res.send(await ListingModel.find().populate({path: 'company', select: 'company'}))
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

// Get all job listings posted by the logged in employer
export const getEmployerDashboard = async (req, res) => {
    try {
        console.log(res.locals.user)
        if (!res.locals.user) {
            return res.status(403).send({ error: 'Please login' })
        }
        if (res.locals.user.isEmployer) {
        res.send(await ListingModel
        .find( { company: res.locals.user})
        .populate({ path: 'company', select: 'company' })
    )} else {
            return res.status(403).send({ error: 'Access denied - employers only.'})
    }}
    catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

// Get one job listing by ID
export const getJobListingByID = async (req, res) => {
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
}

// Update job listing
export const updateJobListing = async (req, res) => {
    const { title, description, location, education, experience } = req.body
    const newJobListing = { title, description, location, education, experience }

    try {
        const listing = await ListingModel
            .findByIdAndUpdate(
                req.params.id, 
                newJobListing, 
                { returnDocument: 'after' })
                .populate({ path: 'company', select: 'company'})
        if (listing) {
            res.send(listing)
        } else {
            res.status(404).send({ error: 'Job listing not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

// Delete job listing
export const deleteJobListing = async (req, res) => {
    try{
        const listing = await ListingModel.findByIdAndDelete(req.params.id)
        if (listing) {
            res.status(204).send({ message: 'Job listing deleted successfully'})
        } else {
            res.status(404).send({ error: 'Job listing not found!' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message})
    }
}