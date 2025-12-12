const { generateError } = require("../../utils/helpers");
const getUserById = require("../../repositories/usersRepository/getUserById");

const getUserProfileController = async (req, res, next) => {
    try {
        const { id } = req.auth;

        const user = await getUserById(id);

        if (!user) {
            throw generateError("El usuario autenticado no existe", 404);
        }

        user.cover_image = user.cover_image || "";

        res.send({
            status: "ok",
            message: "Perfil de usuario obtenido correctamente",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserProfileController;
