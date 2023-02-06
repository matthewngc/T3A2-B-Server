import app from '../app'
import request from 'supertest'

describe("Get listings", () => {

    test('Get all listingss', async () => {
        const res = await request(app).get('/jobs')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        res.body.forEach(element => {
            expect(element).toHaveProperty('_id')
            expect(element).toHaveProperty('title')
            expect(element).toHaveProperty('description')
            expect(element).toHaveProperty('company')
            expect(element).toHaveProperty('location')
            expect(element).toHaveProperty('education')
            expect(element).toHaveProperty('experience')
        })       
    })
})

describe("Create listing", () => {

    let resLogin

    beforeEach(async () => {
        resLogin = await request(app).post('/auth/login')
        .send({
            email: 'anthony@huynh.com',
            password: 'anthony123'
        })
        expect(resLogin.status).toBe(201)
        expect(resLogin.body.token).toBeDefined()
    })

    test('Successfully create listing', async () => {
        const resListing = await request(app).post('/jobs/')
        .send({
            title: 'CEO',
            description: 'Hiring new CEO',
            company: 'Amazon',
            location: 'NSW',
            education: 'Master of Business Administration',
            experience: '5 years'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)
        expect(resListing.status).toBe(201)
        expect(resListing.headers['content-type']).toMatch(/json/i)
        expect(resListing.body).toBeDefined()
        expect(resListing.body).toHaveProperty('_id')
        expect(resListing.body.title).toBe('CEO')
        expect(resListing.body.description).toBe('Hiring new CEO')
        expect(resListing.body.company.company).toBe('Amazon')
        expect(resListing.body.location).toBe('NSW')
        expect(resListing.body.education).toBe('Master of Business Administration')
        expect(resListing.body.experience).toBe('5 years')
 
    })

})
    
