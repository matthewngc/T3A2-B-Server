import express from 'express'
import { createApplication, getApplicationsAll, getApplicationsDashboard, getApplicationByID, updateApplicationStatus, deleteApplication } from '../controllers/application_controller.js'
import { authenticate, authorizeJobseeker, authorizeApplicationOwner, authorizeApplicationReviewer } from '../middleware/authorization.js'
import { findListingOwner } from '../controllers/listing_controller.js'

const router = express.Router()

// CREATE: Create a new job application - only jobseekers can create applications
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

// UPDATE: Update application status - only the application reviewer, i.e. the owner of the listing that the application relates to, can update the status
router.put('/:id', 
    authenticate, 
    authorizeApplicationReviewer, 
    updateApplicationStatus)

// DELETE: Delete a job application - only the jobseeker who created the application or the employer who received the application can delete an application
router.delete('/:id', 
    authenticate, 
    authorizeApplicationOwner, 
    deleteApplication)

export default router