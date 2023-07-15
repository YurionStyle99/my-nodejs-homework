const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});

module.exports = schema;
