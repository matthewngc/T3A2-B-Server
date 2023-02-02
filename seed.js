import { dbConnect, dbClose } from './db.js'
import { ListingModel } from './models/listing.js'
import { UserModel } from './models/user.js'

dbConnect()

await UserModel.deleteMany()
console.log('Deleted all users')
await ListingModel.deleteMany()
console.log('Deleted all listings')

const listings = [
    { 
        title: 'Senior Accountant', 
        description: 'Hiring senior accountant for our company', 
        company: 'ABC & Co.', 
        education: 'Bachelor of Commerce', 
        experience: '5 years'
    },
    { 
        title: 'Architect', 
        description: 'Hiring architect for our company', 
        company: 'DEF Ltd', 
        education: 'Bachelor of Architecture', 
        experience: '2 years'
    },
    { 
        title: 'Software Engineer', 
        description: 'Hiring software engineer for our company', 
        company: 'XY Ltd', 
        education: 'Diploma of IT', 
        experience: '3 years'
    },
]

const users = [
    {
        name: 'John Smith',
        email: 'johnsmith@abc.com',
        password: 'abc123',
        isEmployer: false
    },
    {
        company: 'XYZ Ltd',
        email: 'xyz@xyz.com',
        password: 'xyz123',
        isEmployer: true
    },
    {
        name: 'Andrew Smith',
        email: 'andrewsmith@abc.com',
        company: 'ABC Pty Ltd',
        password: 'password123',
        isEmployer: true
    }
]

await ListingModel.insertMany(listings)
console.log('Inserted listings')

await UserModel.insertMany(users)
console.log('Inserted users')

dbClose()