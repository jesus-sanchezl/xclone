const bcrypt = require("bcrypt");

const { generateError } = require("../../utils/helpers");
const userPasswordSchema = require("../../schemas/userPasswordSchema");
const updatePasswordById = require("../../repositories/usersRepository/updatePasswordById");
const getUserCredentialsById = require("../../repositories/usersRepository/getUserCredentialsById");

const updateUserPasswordController = async (req, res, next) => {
    try {
        const { id } = req.auth;

        const { currentPassword, password } = req.body;

        if (!currentPassword) {
            throw generateError("La contraseña actual es obligatoria", 400);
        }

        await userPasswordSchema.validateAsync(password);

        const currentUser = await getUserCredentialsById(id);

        const isCurrentOk = await bcrypt.compare(
            currentPassword,
            currentUser.password
        );
        if (!isCurrentOk) {
            throw generateError("La contraseña actual no es correcta", 400);
        }

        if (currentPassword === password) {
            throw generateError(
                "La nueva contraseña no puede ser la misma que la anterior",
                400
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);
        await updatePasswordById(id, passwordHash);

        res.send({
            status: "ok",
            message: "Contraseña actualizada correctamente",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateUserPasswordController;
