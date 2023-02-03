import mongoose from 'mongoose'

// Create a Mongoose schema to define the structure of a model
const applicationSchema = new mongoose.Schema({
    listing: { 
        type: mongoose.ObjectId, 
        ref: 'Listing' 
    },
    applicant: { 
        type: mongoose.ObjectId, 
        ref: 'User' 
    },
    company: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    application_date: { 
        type: Date,
        default: Date.now, 
        required: true 
    }
})

// Create a Mongoose model based on the schema
const ApplicationModel = mongoose.model('Application', applicationSchema)

export { ApplicationModel }