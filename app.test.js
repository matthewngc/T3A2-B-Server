import app from './app.js'
import request from "supertest"

describe("App tests", () => {
  test('Get Homepage', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/i)
    expect(res.body.info).toBeDefined()
    expect(res.body.info).toBe("Steve's Jobs")
  }) 

  describe('Get jobs list', () => {
    let res 

    beforeEach(async () => {
        res = await request(app).get('/jobs')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
    })

    it('Should return an array of 9 elements', () => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBe(7)        
    })

    it('Has an element with the correct data structure', () => {
        res.body.forEach(el => {
            expect(el._id).toBeDefined()
            expect(el.title).toBeDefined()
            expect(el._id.length).toBe(24)
        })
        expect(res.body[0].title).toBe('Senior Accountant')
     })
    })

    // test('Create a new listing', async () => {
    //     const res = (await request(app).post('/jobs')).send({
    //         title: 'Senior Accountant',
    //         description: 'Jest Testing',
    //         company: 'Amazon'
    //     })
    // })
  })



describe('Login, Create and Edit listing')
