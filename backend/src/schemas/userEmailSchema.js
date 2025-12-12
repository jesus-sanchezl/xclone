const Joi = require("joi");

const userEmailSchema = Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
        "string.email": "El formato del correo electrónico no es válido.",
        "string.empty": "El correo electrónico no puede estar vacío.",
        "any.required": "El correo electrónico es obligatorio."
    });


module.exports = userEmailSchema;
