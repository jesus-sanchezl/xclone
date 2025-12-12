const Joi = require("joi");

const usernameSchema = Joi.string().min(4).max(120).required();

module.exports = usernameSchema;
