import mongoose from 'mongoose'

// Create a Mongoose schema to define the structure of a model
const listingSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    company: { 
        type: mongoose.ObjectId, 
        ref: 'User' 
    },
    location: {
        type: String,
        required: true
    },
    education: { 
        type: String, 
        required: true 
    },
    experience: { 
        type: String, 
        required: true 
    }
})

// Create a Mongoose model based on the schema
const ListingModel = mongoose.model('Listing', listingSchema)

export { ListingModel }