import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

async function dbClose() {
    await mongoose.connection.close()
    console.log('Database disconnected!')
}

// Connect to MongoDB via Mongoose
try {
    const m = await mongoose.connect(process.env.ATLAS_DB_URL)
    console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect...')
}
    catch(err) {console.log(err)}

// Create a Mongoose schema to define the structure of a model
const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    education: { type: String, required: true },
    experience: { type: String, required: true }
})

// Create a Mongoose model based on the schema
const ListingModel = mongoose.model('Listing', listingSchema)

export { ListingModel, dbClose }