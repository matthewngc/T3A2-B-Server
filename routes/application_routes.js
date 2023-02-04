import express from 'express'
import { createApplication, getApplicationsAll, getApplicationsDashboard, getApplicationByID, updateApplicationStatus, deleteApplication } from '../controllers/application_controller.js'
import { authenticate, authorizeJobseeker, findListingOwner, authorizeApplicationOwner, authorizeApplicationReviewer } from '../middleware/authorization.js'
import { ApplicationModel } from '../models/application.js'

const router = express.Router()

// CREATE: Create a new job application
router.post('/', 
    authenticate, 
    authorizeJobseeker, 
    findListingOwner, 
    createApplication)

// READ: Get all applications
router.get('/', 
    getApplicationsAll)

// READ: Get all applications for logged in jobseeker, or logged in employer
router.get('/dashboard', 
    authenticate, 
    getApplicationsDashboard)


// READ: Get one application
router.get('/:id', 
    getApplicationByID)

// UPDATE: Update application status
router.put('/:id', 
    authenticate, 
    authorizeApplicationReviewer, 
    updateApplicationStatus)

// DELETE: Delete a job application
router.delete('/:id', 
    authenticate, 
    authorizeApplicationOwner, 
    deleteApplication)

export default router