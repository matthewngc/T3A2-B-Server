import express from "express"
import listingRoutes from './routes/listing_routes.js'
import userRoutes from './routes/user_routes.js'
import applicationRoutes from './routes/application_routes.js'
import { dbConnect } from './db.js'

dbConnect()

const app = express()
const port = 4002

app.use(express.json())

app.get('/', (req, res) => res.send({ info: "Steve's Jobs" }))

app.use('/jobs', listingRoutes)

app.use('/users', userRoutes)

app.use('/applications', applicationRoutes)

app.listen(port, () => console.log(`App running at http://localhost:${port}/`))