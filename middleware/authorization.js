import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from '../models/user.js'
import { ListingModel } from '../models/listing.js'
import { ApplicationModel } from '../models/application.js'

dotenv.config()

// Authenticate user by verifying token
export const authenticate = async (req, res, next) => {
    try {
        console.log(req.headers)
        let authHeader = req.headers["authorization"]
        if (authHeader === undefined) {
            return res.status(401).send({ error: 'You do not have permission to perform this action.'})
        }
        console.log('test')
        if (authHeader.startsWith('Bearer ')) {
            const accessToken = authHeader.substring(6).trim()
            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
            res.locals.user = await UserModel.findById(verifiedToken.id)
            console.log('User authenticated.')
            next()
        }
    } catch (err) {
        return res.status(401).send({ error: err.message })
    }
}

// Check that the logged in user is an employer and authorize
export const authorizeEmployer = async (req, res, next) => {
    try {
        // console.log(user)
        if (res.locals.user.isEmployer) {
            next()
        } else {
            return res.status(401).send({ error: 'Only employers can perform this action.'})
        }
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

// Check that the logged in user is a jobseeker and authorize
export const authorizeJobseeker = async (req, res, next) => {
    try {
        if (!res.locals.user.isEmployer) {
            next()
        } else {
            return res.status(401).send({ error: 'Only jobseekers can perform this action.'})
        }
    } catch (err) { 
        return res.status(500).send( {error: err.message })
    }
}

// Check that the logged in user is the owner of the listing and authorize
export const authorizeListingOwner = async (req, res, next) => {
    try{
        const listing = await ListingModel.findById(req.params.id)
        if (!listing) {
            return res.status(404).send({ error: 'No listing found under this ID.'})
        }
        const ownerID = listing.company._id.valueOf()
        const userID = res.locals.user._id.valueOf()
        if (ownerID != userID) {
            return res.status(401).send({ error: 'Only the owner of this listing can perform this action.'})
        } else {
            next()
        }
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

// Check that the logged in user is the owner of the application and authorize
export const authorizeApplicationOwner = async (req, res, next) => {
    try {
        const application = await ApplicationModel.findById(req.params.id)
        if (!application) {
            return res.status(404).send({ error: 'No application found under this ID.'})
        }
        const companyID = application.company._id.valueOf()
        const applicantID = application.applicant._id.valueOf()
        const userID = res.locals.user._id.valueOf()
        console.log(companyID != userID && applicantID != userID)
        if (companyID != userID && applicantID != userID) {
            return res.status(403).send({ error: 'Only the applicant or the company that posted the listing can perform this action.'})
        } else {
            next()
        }
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

// Check that the logged in user is the owner of the listing that the application relates to, and authorize
export const authorizeApplicationReviewer = async (req, res, next) => {
    try {
        const application = await ApplicationModel.findById(req.params.id)
        if (!application) {
            return res.status(404).send({ error: 'No application found under this ID.'})
        }
        const companyID = application.company._id.valueOf()
        const userID = res.locals.user._id.valueOf()
        if (companyID != userID) {
            return res.status(403).send({ error: 'Only the company that posted the listing can perform this action.' })
        } else {
            next()
        }
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}






