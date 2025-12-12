const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getNotificationById = require("../../repositories/notificationsRepository/getNotificationById");
const markNotificationAsRead = require("../../repositories/notificationsRepository/markNotificationAsRead");

const markNotificationAsReadController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth.id;

        await idSchema.validateAsync(id);

        
        const notification = await getNotificationById(id);
        if (!notification) {
            throw generateError(`La notificación con ID ${id} no existe`, 404);
        }

        if (notification.user_id !== userId) {
            throw generateError(
                "No tienes permisos para modificar esta notificación",
                403
            );
        }

        await markNotificationAsRead(id);

        res.send({
            status: "ok",
            message: "La notificación fue marcada como leída.",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = markNotificationAsReadController;
