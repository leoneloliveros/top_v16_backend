const request = require('supertest');
const mongoose = require('mongoose')
const app = require('../../app')

afterEach(() => {
  mongoose.disconnect()
})

test("get Products", async () => {
  const response = await request(app).get('/api/products/')

  expect(response.statusCode).toBe(200)
})