import express from "express"
import { ListingModel } from './db.js'


const app = express()
const port = 4002

app.use(express.json())

app.get('/', (req, res) => res.send({ info: "Steve's Jobs" }))

app.get('/jobs', async (req, res) => res.send(await ListingModel.find()))

app.get('/jobs/:id', (req, res) => {
    const listing = listings[req.params.id]
    if (listing) {
        res.send(listing)
    } else {
        res.status(404).send({ error: 'Job listing not found' })
    }
})

app.post('/jobs', (req, res) => {
    const { title, description, company, education, experience } = req.body
    const newJobListing = { title, description, company, education, experience }
    listings.push(newJobListing)
    res.status(201).send(newJobListing)
})

app.listen(port, () => console.log(`App running at http://localhost:${port}/`))