const Joi = require('joi')
const mongoose = require('mongoose')

const productValidationSchema = Joi.object({
  name: Joi.string().min(5).required(),
  slug: Joi.number(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  isActive: Joi.boolean().optional(),
})

module.exports = productValidationSchema