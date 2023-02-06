import app from './app.js'
import request from "supertest"

// describe("App tests", () => {
//   test('Get Homepage', async () => {
//     const res = await request(app).get('/')
//     expect(res.status).toBe(200)
//     expect(res.headers['content-type']).toMatch(/json/i)
//     expect(res.body.info).toBeDefined()
//     expect(res.body.info).toBe("Steve's Jobs")
//   }) 

//   describe('Get jobs list', () => {
//     let res 

//     beforeEach(async () => {
//         res = await request(app).get('/jobs')
//         expect(res.status).toBe(200)
//         expect(res.headers['content-type']).toMatch(/json/i)
//     })

//     it('Should return an array of 9 elements', () => {
//         expect(res.body).toBeInstanceOf(Array)
//         expect(res.body.length).toBe(7)        
//     })

//     it('Has an element with the correct data structure', () => {
//         res.body.forEach(el => {
//             expect(el._id).toBeDefined()
//             expect(el.title).toBeDefined()
//             expect(el._id.length).toBe(24)
//         })
//         expect(res.body[0].title).toBe('Senior Accountant')
//      })
//     })

//   })



describe('Login, Create and Edit listing', () => {

    test('Register as employer, login, create and edit listing', async () => {

        await request(app).post('/auth/register')
        .send({
            email: 'anthony@huynh.com',
            password: 'anthony123',
            name: 'Anthony Huynh',
            company: 'Al Tazah',
            isEmployer: true
        })

        const resLogin = await request(app).post('/auth/login')
        .send({
            email: 'anthony@huynh.com',
            password: 'anthony123',
        })

        expect(resLogin.status).toBe(201)
        expect(resLogin.headers['content-type']).toMatch(/json/i)
        expect(resLogin.body).toBeDefined()
        expect(resLogin.body).toHaveProperty('id')
        expect(resLogin.body).toHaveProperty('token')
        expect(resLogin.body.email).toBe('anthony@huynh.com')

        const resListing = await request(app).post('/jobs/')
        .send({
            title: 'CEO',
            description: 'Hiring new CEO',
            company: 'Amazon',
            location: 'NSW',
            education: 'Master of Business Administration',
            experience: '5 years'
        })
        .set('authorization', 'Bearer' + resLogin.body.token)

        expect(resListing.status).toBe(201)
        expect(resListing.headers['content-type']).toMatch(/json/i)
        expect(resListing.body).toBeDefined()
        expect(resListing.body).toHaveProperty('_id')
        expect(resListing.body.title).toBe('CEO')
        expect(resListing.body.description).toBe('Hiring new CEO')
        expect(resListing.body.companny).toBe('Amazon')
        expect(resListing.body.location).toBe('NSW')
        expect(resListing.body.education).toBe('Master of Business Administration')
        expect(resListing.body.experience).toBe('5 years')

        const resEditListing = await request(app).put(`/jobs/${resListing.body._id}`)
        .send({
            title: 'CFO',
            description: 'Hiring new CFO',
            company: 'Google',
            location: 'QLD',
            education: 'Bachelor of Commerce',
            experience: '3 years'
        })

        .set('authorization', 'Bearer' + resLogin.body.token)

        expect(resEditListing.status).toBe(200)
        expect(resEditListing.headers['content-type']).toMatch(/json/i)
        expect(resEditListing.body).toBeDefined()
        expect(resEditListing.body.title).toBe('CFO')
        expect(resEditListing.body.description).toBe('Hiring new CFO')
        expect(resEditListing.body.company).toBe('Google')
        expect(resEditListing.body.location).toBe('QLD')
        expect(resEditListing.body.education).toBe('Bachelor of Commerce')
        expect(resEditListing.body.experience).toBe('3 years')


    })

})
