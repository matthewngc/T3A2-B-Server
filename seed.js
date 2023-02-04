import { dbConnect, dbClose } from './db.js'
import { ApplicationModel } from './models/application.js'
import { ListingModel } from './models/listing.js'
import { UserModel } from './models/user.js'

import bcrypt from 'bcrypt'

// Connect to DB
dbConnect()

// Drop all existing models from database
await UserModel.deleteMany()
console.log('Deleted all users')
await ListingModel.deleteMany()
console.log('Deleted all listings')
await ApplicationModel.deleteMany()
console.log('Deleted all applications')

// Seed users

const users = [
    {
        name: 'John Smith',
        email: 'johnsmith@abc.com',
        mobile: '0423 123 123',
        debugPW: 'abc123',
        password: await bcrypt.hash('abc123', 10),
        isEmployer: false,
    },
    {
        company: 'XYZ Ltd',
        email: 'xyz@xyz.com',
        mobile: '0414 414 414',
        debugPW: 'xyz123',
        password: await bcrypt.hash('xyz123', 10),
        isEmployer: true,
    },
    {
        name: 'Andrew Smith',
        email: 'andrewsmith@abc.com',
        mobile: '0444 444 444',
        company: 'ABC Pty Ltd',
        debugPW: 'password123',
        password: await bcrypt.hash('password123', 10),
        isEmployer: true,
    },
    {
        name: 'James Johnson',
        email: 'jamesjohnson@abc.com',
        mobile: '0481 111 111',
        debugPW: 'password123',
        password: await bcrypt.hash('password123', 10),
        isEmployer: false,
    },
    {
        company: 'McDonalds',
        email: 'mcdonalds@abc.com',
        mobile: '0404 040 404',
        debugPW: 'maccas123',
        password: await bcrypt.hash('maccas123', 10),
        isEmployer: true,
    },
    {
        company: 'Riot Games',
        email: 'riot@abc.com',
        mobile: '02 9999 9999',
        debugPW: 'password123',
        password: await bcrypt.hash('password123', 10),
        isEmployer: true,
    },
    {
        company: 'Amazon',
        email: 'amazon@abc.com',
        mobile: '03 8888 8888',
        debugPW: 'password123',
        password: await bcrypt.hash('password123', 10),
        isEmployer: true,
    },

]

const seedUsers = await UserModel.insertMany(users)
console.log('Inserted users')

const listings = [
    { 
        title: 'Senior Accountant', 
        description: 'Hiring senior accountant for our company', 
        company: seedUsers[1]._id, 
        location: 'NSW',
        education: 'Bachelor of Commerce', 
        experience: '5 years'
    },
    { 
        title: 'Architect', 
        description: 'Hiring architect for our company', 
        company: seedUsers[1]._id, 
        location: 'QLD',
        education: 'Bachelor of Architecture', 
        experience: '2 years'
    },
    { 
        title: 'Software Engineer', 
        description: 'Hiring software engineer for our company', 
        company: seedUsers[2]._id, 
        location: 'VIC',
        education: 'Diploma of IT', 
        experience: '3 years'
    },
    { 
        title: 'Programmer', 
        description: 'Hiring programmer for our company', 
        company: seedUsers[6]._id, 
        location: 'NSW',
        education: 'Diploma of IT', 
        experience: '2 years'
    },
    { 
        title: 'Store Manager', 
        description: 'Hiring store manager for our company', 
        company: seedUsers[4]._id, 
        location: 'WA',
        education: 'Diploma of Cooking', 
        experience: '10 years'
    },
    { 
        title: 'Game Developer', 
        description: 'Hiring software engineer for our company', 
        company: seedUsers[5]._id, 
        location: 'ACT',
        education: 'Bachelor of Computer Science', 
        experience: '5 years'
    },
    { 
        title: 'CEO', 
        description: 'Hiring CEO for our company', 
        company: seedUsers[6]._id, 
        location: 'TAS',
        education: 'Bachelor of Commerce', 
        experience: '1 years'
    },
]

const seedListings = await ListingModel.insertMany(listings)
console.log('Inserted listings')

const applications = [
    {
        listing: seedListings[0]._id,
        applicant: seedUsers[0]._id,
        company: seedUsers[1]._id
    },
    {
        listing: seedListings[2]._id,
        applicant: seedUsers[3]._id,
        company: seedUsers[2]._id
    },
    {
        listing: seedListings[1]._id,
        applicant: seedUsers[3]._id,
        company: seedUsers[1]._id
    },
    {
        listing: seedListings[2]._id,
        applicant: seedUsers[0]._id,
        company: seedUsers[2]._id,
    },
    {
        listing: seedListings[4]._id,
        applicant: seedUsers[0]._id,
        company: seedUsers[6]._id,
    },
    {
        listing: seedListings[6]._id,
        applicant: seedUsers[0]._id,
        company: seedUsers[5]._id,
    }
]

const seedApplications = await ApplicationModel.insertMany(applications)
console.log('Inserted applications')

dbClose()