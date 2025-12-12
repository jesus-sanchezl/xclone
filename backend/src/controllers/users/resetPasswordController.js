const crypto = require("crypto");
const bcrypt = require("bcrypt");

const { generateError } = require("../../utils/helpers");
const userPasswordSchema = require("../../schemas/userPasswordSchema");
const updatePasswordById = require("../../repositories/usersRepository/updatePasswordById");
const deleteResetToken = require("../../repositories/usersRepository/deleteResetToken");
const findUserByResetToken = require("../../repositories/usersRepository/findUserByResetToken");

const resetPasswordController = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        if (!token) {
            throw generateError(
                "El enlace de recuperación no es válido o ha expirado.",
                400
            );
        }

        await userPasswordSchema.validateAsync(password);

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const tokenData = await findUserByResetToken(tokenHash);

        if (!tokenData) {
            throw generateError(
                "El enlace de recuperación no es válido o ha expirado.",
                400
            );
        }

        if (new Date() > tokenData.reset_token_expiry) {
            throw generateError(
                "El enlace de recuperación no es válido o ha expirado.",
                400
            );
        }

        const userId = tokenData.user_id;

        const passwordHash = await bcrypt.hash(password, 10);

        await updatePasswordById(userId, passwordHash);

        await deleteResetToken(tokenHash);

        res.send({
            status: "ok",
            message: "Contraseña restablecida correctamente",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = resetPasswordController;
