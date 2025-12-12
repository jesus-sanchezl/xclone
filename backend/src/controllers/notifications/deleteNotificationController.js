const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const deleteNotification = require("../../repositories/notificationsRepository/deleteNotification");
const getNotificationById = require("../../repositories/notificationsRepository/getNotificationById");

const deleteNotificationController = async (req, res, next) => {
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
                "No tienes permisos para eliminar esta notificación",
                403
            );
        }

        await deleteNotification(id);

        res.send({
            status: "ok",
            message: `La notificación con ID ${id} fue eliminada correctamente.`,
            data: { id }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteNotificationController;
