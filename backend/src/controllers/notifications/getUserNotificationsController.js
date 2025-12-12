const getUserNotifications = require("../../repositories/notificationsRepository/getUserNotifications");

const getUserNotificationsController = async (req, res, next) => {
    try {
        const userId = req.auth.id;
        

        const notifications = await getUserNotifications(userId);


        res.send({
            status: "ok",
            message: notifications.length === 0 ? "No tienes notificaciones" : null,
            data: notifications,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserNotificationsController;
