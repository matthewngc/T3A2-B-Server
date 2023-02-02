import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

async function dbClose() {
    await mongoose.connection.close()
    console.log('Database disconnected!')
}

// Connect to MongoDB via Mongoose
async function dbConnect() {
    try {
        const m = await mongoose.connect(process.env.ATLAS_DB_URL)
        console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect...')
    }
        catch(err) {console.log(err)}
}

export { dbClose, dbConnect }