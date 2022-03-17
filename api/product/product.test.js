const request = require('supertest');
const mongoose = require('mongoose')
const app = require('../../app');
const { signToken } = require('../../auth/auth.services');
const User = require('../user/user.model');
const Product = require('./product.model');

let user, token

beforeEach(async () => {
  for (var i in mongoose.connection.collections) {
    await mongoose.connection.collections[i].deleteMany({});
  }

  user = await User.create({ 
    "email": "leoneloliveros.co@gmail.com",
    "password": "1234",
    "lastName": "oliveros",
    "firstName": "Leonel"
  })

  token = signToken(user.profile)
});

afterAll(async () => {
  await mongoose.disconnect()
})

describe('GET /api/products/', () => {
  test("Respons with 200", async () => {
    jest.setTimeout(500000)
    
    const response = await request(app)
    .get('/api/products/')
    .set('Authorization', `Bearer ${token}`)
    // .send({
    //   "name": "Nuevo producto desde el test",
    //   "description": "Es un producto desde el test en el 2022"
    // })

    expect(response.statusCode).toBe(200)
  })

    // Prueba de funcionalidad de middleware isAuthenticated
  test("Respons with 401 if user is not authenticated", async () => {
    const response = await request(app)
    .get('/api/products/')

    expect(response.statusCode).toBe(401)
  })

  test("respons with a list of products", async () => {
    jest.setTimeout(500000)


    const product1 = await Product.create({
        "name": "Nuevo producto desde el test 1",
        "description": "Es un producto desde el test en el 2022",
        "userData": { user, role: user.role}
      })

    const product2 = await Product.create({
      "name": "Nuevo producto desde el test 2",
      "description": "Es un producto desde el test en el 2022",
      "userData": { user, role: user.role}
    })      

    const response = await request(app)
    .get('/api/products/')
    .set('Authorization', `Bearer ${token}`)

    expect(response.body.data.length).toBe(2)
  })


  test("Verify query params", async () => {
    jest.setTimeout(500000)


    const product1 = await Product.create({
        "name": "Nuevo producto desde el test 1",
        "description": "Es un producto desde el test en el 2022",
        "userData": { user, role: user.role}
      })

    const product2 = await Product.create({
      "name": "Nuevo producto desde el test 2",
      "description": "Es un producto desde el test en el 2022",
      "userData": { user, role: user.role}
    })      


    const response = await request(app)
    .get('/api/products?page=1&limit=2')
    .set('Authorization', `Bearer ${token}`)

    expect(parseInt(response.body.page)).toBe(1)
    expect(parseInt(response.body.limit)).toBe(2)
    expect(response.body.data.length).toBe(2)

    const response2 = await request(app)
    .get('/api/products?page=2&limit=2')
    .set('Authorization', `Bearer ${token}`)

    expect(parseInt(response2.body.page)).toBe(2)
    expect(parseInt(response2.body.limit)).toBe(2)
    expect(response2.body.data.length).toBe(0)
  })
  
  
})

