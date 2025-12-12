const idSchema = require("../../schemas/idSchema");
const getUserById = require("../../repositories/usersRepository/getUserById");

const getUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await idSchema.validateAsync(id);

        const user = await getUserById(id);

        res.send({
            status: "ok",
            message: "Usuario obtenido correctamente",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserByIdController;
