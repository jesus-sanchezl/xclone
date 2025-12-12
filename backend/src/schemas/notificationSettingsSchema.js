const Joi = require('joi');

const notificationSettingsSchema = Joi.object({
    allow_likes: Joi.boolean().required(),
    allow_retweets: Joi.boolean().required(),
    allow_follows: Joi.boolean().required(),
    allow_comments: Joi.boolean().required(),
});

module.exports = notificationSettingsSchema;
