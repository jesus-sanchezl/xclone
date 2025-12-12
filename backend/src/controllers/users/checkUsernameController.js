const { generateError } = require("../../utils/helpers");
const getUserByUsername = require("../../repositories/usersRepository/getUserByUsername");
const usernameSchema = require("../../schemas/usernameSchema");

const checkUsernameController = async (req, res, next) => {
    try {
        const { username } = req.body;
        await usernameSchema.validateAsync(username);

        const user = await getUserByUsername(username);

        if (user) {
            throw generateError(
                "Este nombre de usuario no está disponible.",
                400
            );
        }

        res.send({
            status: "ok",
            message: "El nombre de usuario está disponible",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = checkUsernameController;
