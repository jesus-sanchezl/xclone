const { generateError } = require("../../utils/helpers");
const updateIsPrivate = require("../../repositories/usersRepository/updateIsPrivate");

const updatePrivacySettingsController = async (req, res, next) => {
    try {
        if (!req.auth || !req.auth.id) {
            throw generateError("No autorizado", 401);
        }

        const { id } = req.auth;
        const { isPrivate } = req.body;

        if (typeof isPrivate !== "boolean") {
            throw generateError(
                "El campo 'isPrivate' debe ser true o false",
                400
            );
        }

        await updateIsPrivate(id, isPrivate);

        res.send({
            status: "ok",
            message: "Configuración de privacidad actualizada correctamente",
            data: { isPrivate },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updatePrivacySettingsController;
