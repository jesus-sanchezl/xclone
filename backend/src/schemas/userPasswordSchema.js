const Joi = require("joi");

const userPasswordSchema = Joi.string()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .required()
    .messages({
        "string.min": "La contraseña debe tener al menos 8 caracteres",
        "string.max": "La contraseña no debe superar los 20 caracteres",
        "string.pattern.base":
            "La contraseña debe contener al menos una letra y un número",
        "string.empty": "La contraseña no puede estar vacía.",
        "any.required": "Debes introducir una contraseña.",
    });

module.exports = userPasswordSchema;
