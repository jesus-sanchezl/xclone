const Joi = require("joi");

const contentSchema = Joi.object({
    content: Joi.string().trim().min(1).max(280).required(),
});


module.exports = contentSchema;

