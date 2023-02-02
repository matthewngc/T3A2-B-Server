import { dbConnect, dbClose } from './db.js'
import { ApplicationModel } from './models/application.js'
import { ListingModel } from './models/listing.js'
import { UserModel } from './models/user.js'

dbConnect()

await UserModel.deleteMany()
console.log('Deleted all users')
await ListingModel.deleteMany()
console.log('Deleted all listings')
await ApplicationModel.deleteMany()



const users = [
    {
        name: 'John Smith',
        email: 'johnsmith@abc.com',
        password: 'abc123',
        isEmployer: false,
        // role: 'jobseeker'
    },
    {
        company: 'XYZ Ltd',
        email: 'xyz@xyz.com',
        password: 'xyz123',
        isEmployer: true,
        // role: 'employer'
    },
    {
        name: 'Andrew Smith',
        email: 'andrewsmith@abc.com',
        company: 'ABC Pty Ltd',
        password: 'password123',
        isEmployer: true,
        // role: 'employer'
    },
    {
        name: 'James Johnson',
        email: 'jamesjohnson@abc.com',
        password: 'password123',
        isEmployer: false,
        // role:'jobseeker'
    }
]

const seedUsers = await UserModel.insertMany(users)
console.log('Inserted users')

const listings = [
    { 
        title: 'Senior Accountant', 
        description: 'Hiring senior accountant for our company', 
        company: seedUsers[1]._id, 
        education: 'Bachelor of Commerce', 
        experience: '5 years'
    },
    { 
        title: 'Architect', 
        description: 'Hiring architect for our company', 
        company: seedUsers[1]._id, 
        education: 'Bachelor of Architecture', 
        experience: '2 years'
    },
    { 
        title: 'Software Engineer', 
        description: 'Hiring software engineer for our company', 
        company: seedUsers[2]._id, 
        education: 'Diploma of IT', 
        experience: '3 years'
    },
]

const seedListings = await ListingModel.insertMany(listings)
console.log('Inserted listings')

const applications = [
    {
        listing: seedListings[0]._id,
        applicant: seedUsers[0]._id
    },
    {
        listing: seedListings[2]._id,
        applicant: seedUsers[3]._id
    },
    {
        listing: seedListings[1]._id,
        applicant: seedUsers[3]._id
    }
]

const seedApplications = await ApplicationModel.insertMany(applications)
console.log('Inserted applications')

dbClose()