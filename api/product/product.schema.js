/* eslint-disable */ 

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const BodySchema = Joi.object({
  name: Joi.string().required(),
  description:  Joi.string().required(),
  userData: Joi.object({
    user: Joi.objectId(),
    role: Joi.string().required()
  })
})

const ParamsSchema = Joi.object({
  id: Joi.objectId().required(),
  name: Joi.string()
})

const ParamsNewUpdate = Joi.object({
  params: Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().required()
  }).required()
})

const QuerySchema = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  find: Joi.string(),
})

const ProductSchema = Joi.object({
  body: BodySchema,
  params: ParamsSchema,
  query: QuerySchema,
})

module.exports = {
  BodySchema,
  ParamsSchema,
  ProductSchema,
  ParamsNewUpdate
}

