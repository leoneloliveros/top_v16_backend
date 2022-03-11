const request = require('supertest');
const mongoose = require('mongoose')
const app = require('../app')

afterAll(() => {
  mongoose.disconnect()
})

test("get helloWorld", async () => {
  jest.setTimeout(30000);
  const response = await request(app).get('/helloWorld')

  expect(response.statusCode).toBe(200)
})