const request = require('supertest');
const mongoose = require('mongoose')
const app = require('../app')

afterAll(() => {
  mongoose.disconnect()
})

test("get helloWorld", async () => {
  const response = await request(app).get('/helloWorld')

  expect(response.statusCode).toBe(200)
})