import express from "express"
import listingRoutes from './routes/listing_routes.js'
import userRoutes from './routes/user_routes.js'
import applicationRoutes from './routes/application_routes.js'
import authRoutes from './routes/auth_routes.js'
import { dbConnect } from './db.js'
import cors from 'cors'



dbConnect()

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({ info: "Steve's Jobs" }))

app.use('/jobs', listingRoutes)

app.use('/users', userRoutes)

app.use('/applications', applicationRoutes)

app.use('/auth', authRoutes)

export default app