const { generateError } = require("../../utils/helpers");
const userDataSchema = require("../../schemas/userDataSchema");
const getUserByUsername = require("../../repositories/usersRepository/getUserByUsername");
const updateUserById = require("../../repositories/usersRepository/updateUserById");

const updateUserDataController = async (req, res, next) => {
    try {
        const { id } = req.auth;
        const { body } = req;

        await userDataSchema.validateAsync(body);

        const { name, username, bio, location, birthdate } = body;


        const currentUserByUsername = await getUserByUsername(username);
        if (currentUserByUsername && currentUserByUsername.id !== id) {
            throw generateError(
                "Ya existe usuario con ese nombre de usuario",
                409
            );
        }

        await updateUserById({ id, name, username, bio, location, birthdate });

        res.send({
            status: "ok",
            message: "Usuario actualizado correctamente",
            data: { id, name, username, bio, location, birthdate },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateUserDataController;
