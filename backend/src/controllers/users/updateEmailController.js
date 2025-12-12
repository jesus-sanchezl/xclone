const { generateError } = require("../../utils/helpers");
const userEmailSchema = require("../../schemas/userEmailSchema");
const getUserByEmail = require("../../repositories/usersRepository/getUserByEmail");
const getUserById = require("../../repositories/usersRepository/getUserById");
const updateEmail = require("../../repositories/usersRepository/updateEmail");

const updateEmailController = async (req, res, next) => {
    try {
        const { id } = req.auth;
        const { email } = req.body;

        const user = await getUserById(id);
        if (!user) {
            throw generateError("Usuario no encontrado", 404);
        }

        await userEmailSchema.validateAsync(email);
        if (user.email === email) {
            throw generateError(
                "El nuevo correo no puede ser igual al actual",
                400
            );
        }

        const currentUserByEmail = await getUserByEmail(email);
        if (currentUserByEmail && currentUserByEmail.id !== id) {
            throw generateError("Ya existe usuario con ese email", 409);
        }

        await updateEmail(id, email);

        res.send({
            status: "ok",
            message: "Correo electrónico actualizado correctamente",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateEmailController;
