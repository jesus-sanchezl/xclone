const Joi = require ('joi')


const userDataSchema = Joi.object().keys({
    name: Joi.string().trim().min(3).max(50).required(),
    username: Joi.string()
            .pattern(/^[A-Za-z][A-Za-z0-9_]{3,14}$/)
            .required()
            .messages({
                "string.pattern.base":
                    "El nombre de usuario debe empezar por una letra y solo puede contener letras, números o guiones bajos.",
                "string.empty": "El nombre de usuario es obligatorio.",
            }),
    bio: Joi.string().max(200).allow("").optional(),
    location: Joi.string().max(100).allow("").optional(),
    birthdate: Joi.date().less("now").optional().allow(null),
});



module.exports = userDataSchema;