const request = require('supertest');
const axios = require('axios')
const mongoose = require('mongoose')
const app = require('../../app')

afterAll(async () => {
  await mongoose.disconnect()
})

test("get helloWorld", async () => {
  const response = await request(app).get('/helloWorld')
  expect(response.statusCode).toBe(201) //validacion
})


// Preparar el ambiente
// ejecutamos los servicios/ los controladores
// validacion