import mongoose from 'mongoose'

// Create a Mongoose schema to define the structure of a model
const userSchema = new mongoose.Schema({
    isEmployer: {
        type: Boolean,
        default: false
    },
    name: { 
        type: String, 
        required: function () {
            return !this.isEmployer
        }
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    company: { 
        type: String, 
        required: function () {
            return this.isEmployer
        }
    },
    password: { 
        type: String, 
        required: true 
    }
})

// Create a Mongoose model based on the schema
const UserModel = mongoose.model('User', userSchema)

export { UserModel }