import express from 'express'
import { ListingModel } from '../models/listing.js'
import { authenticate, authorizeEmployer, authorizeListingOwner } from '../middleware/authorization.js'
import { createJobListing, getJobListingAll, getEmployerDashboard, getJobListingByID, updateJobListing, deleteJobListing } from '../controllers/listing_controller.js'

const router = express.Router()

// CREATE: Post job listing
router.post('/', 
    authenticate, 
    authorizeEmployer, 
    createJobListing)

// READ: Get all job listings
router.get('/', 
    getJobListingAll)

// READ: Get all job listings from logged in employer
router.get('/dashboard', 
    authenticate, 
    getEmployerDashboard)

// READ: Get one job listing by ID
router.get('/:id', 
    getJobListingByID)

// UPDATE: update job listing
router.put('/:id', 
    authenticate, 
    authorizeListingOwner, 
    updateJobListing)

// DELETE: delete job listing
router.delete('/:id', 
    authenticate, 
    authorizeListingOwner, 
    deleteJobListing)

export default router