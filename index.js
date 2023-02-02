import express from "express"
import listingRoutes from './routes/listing_routes.js'

const app = express()
const port = 4002

app.use(express.json())

app.get('/', (req, res) => res.send({ info: "Steve's Jobs" }))

app.use('/jobs', listingRoutes)

app.listen(port, () => console.log(`App running at http://localhost:${port}/`))