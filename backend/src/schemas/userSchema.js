const Joi = require("joi");

const userSchema = Joi.object().keys({
    name: Joi.string().trim().min(3).max(50).required(),
    username: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z0-9_]{3,14}$/)
        .required()
        .messages({
            "string.pattern.base":
                "El nombre de usuario debe empezar por una letra y solo puede contener letras, números o guiones bajos.",
            "string.empty": "El nombre de usuario es obligatorio.",
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string().min(4).max(20).required(),
    repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Las contraseñas no coinciden",
    }),
    profile_image: Joi.any().optional().allow(null),
    bio: Joi.string().max(200).optional().allow(null),
    location: Joi.string().max(100).optional().allow(null),
    birthdate: Joi.date().less("now").optional().allow(null),
});

module.exports = userSchema;
