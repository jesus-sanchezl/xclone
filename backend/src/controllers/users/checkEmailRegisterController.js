const { generateError } = require("../../utils/helpers");
const userEmailSchema = require("../../schemas/userEmailSchema");
const getUserByEmail = require("../../repositories/usersRepository/getUserByEmail");

const checkEmailRegisterController = async (req, res, next) => {
    try {
        const { email } = req.body;
        await userEmailSchema.validateAsync(email);

        const user = await getUserByEmail(email);

        if (user) {
            throw generateError(
                "Ya existe una cuenta registrada con este correo electrónico.",
                400
            );
        }

        res.send({
            status: "ok",
            message: "El email está disponible",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = checkEmailRegisterController;
