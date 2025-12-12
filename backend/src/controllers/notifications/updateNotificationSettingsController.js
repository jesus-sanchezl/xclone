const notificationSettingsSchema = require("../../schemas/notificationSettingsSchema");
const updateNotificationsSettings = require("../../repositories/notificationsRepository/updateNotificationsSettings");


const updateNotificationSettingsController = async (req, res, next) => {
    try {
        const userId = req.auth.id;
        const { body } = req;

        await notificationSettingsSchema.validateAsync(body);

        const { allow_likes, allow_retweets, allow_follows, allow_comments } = body;

        await updateNotificationsSettings(userId, {
            allow_likes,
            allow_retweets,
            allow_follows,
            allow_comments,
        });

        res.send({
            status: "ok",
            message:
                "La configuración de notificaciones se actualizó correctamente.",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateNotificationSettingsController;
