const { generateError } = require("../../utils/helpers");
const userEmailSchema = require("../../schemas/userEmailSchema");
const getUserByEmail = require("../../repositories/usersRepository/getUserByEmail");

const checkEmailLoginController = async (req, res, next) => {
    try {
        const { email } = req.body;

        await userEmailSchema.validateAsync(email);

        const user = await getUserByEmail(email);
        if (!user) {
            throw generateError(
                "No existe ninguna cuenta asociada a este correo electrónico.",
                400
            );
        }

        res.send({
            status: "ok",
            message: "Hemos encontrado una cuenta con este correo electrónico.",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = checkEmailLoginController;
