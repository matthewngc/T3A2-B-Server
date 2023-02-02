import { ListingModel, dbClose } from './db.js'

await ListingModel.deleteMany()
console.log('Deleted all listings')

const listings = [
    { title: 'Software Engineer', description: 'Hiring software engineer for our company', company: 'XY Ltd', education: 'Diploma of IT', experience: '3 years'},
    { title: 'Senior Accountant', description: 'Hiring senior accountant for our company', company: 'ABC & Co.', education: 'Bachelor of Commerce', experience: '5 years'},
    { title: 'Architect', description: 'Hiring architect for our company', company: 'DEF Ltd', education: 'Bachelor of Architecture', experience: '2 years'},
]

await ListingModel.insertMany(listings)
console.log('Inserted listings')

dbClose()