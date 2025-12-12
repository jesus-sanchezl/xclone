const Joi = require("joi");

const idSchema = Joi.number().integer().positive().required();

module.exports = idSchema;
