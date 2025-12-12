const { generateError } = require("../../utils/helpers");
const blockUser = require("../../repositories/usersRepository/blockUser");
const unblockUser = require("../../repositories/usersRepository/unBlockUser");
const validateUserExists = require("../../repositories/usersRepository/validateUserExists");

const blockUserController = async (req, res, next) => {
    try {
        if (!req.auth || !req.auth.id) {
            throw generateError("No autorizado", 401);
        }

        const { id } = req.auth;
        const { blockedUserId, action } = req.body;

        if (!["block", "unblock"].includes(action)) {
            throw generateError("La acción debe ser 'block' o 'unblock'", 400);
        }

        if (!blockedUserId) {
            throw generateError("El campo 'blockedUserId' es obligatorio", 400);
        }

        if (Number(blockedUserId) === Number(id)) {
            throw generateError("No puedes bloquearte a ti mismo", 400);
        }

        await validateUserExists(blockedUserId);

        if (action === "block") {
            await blockUser(id, blockedUserId);
        } else {
            await unblockUser(id, blockedUserId);
        }

        res.send({
            status: "ok",
            message: `Usuario ${
                action === "block" ? "bloqueado" : "desbloqueado"
            } correctamente`,
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = blockUserController;
