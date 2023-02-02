import express from "express"

const listings = [
    { title: 'Software Engineer', description: 'Hiring software engineer for our company', company: 'XY Ltd', education: 'Diploma of IT', experience: '3 years'},
    { title: 'Senior Accountant', description: 'Hiring senior accountant for our company', company: 'ABC & Co.', education: 'Bachelor of Commerce', experience: '5 years'},
    { title: 'Architect', description: 'Hiring architect for our company', company: 'DEF Ltd', education: 'Bachelor of Architecture', experience: '2 years'},
]


const app = express()
const port = 4002

app.use(express.json())

app.get('/', (req, res) => res.send({ info: "Steve's Jobs" }))

app.get('/jobs', (req, res) => res.send(listings))

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