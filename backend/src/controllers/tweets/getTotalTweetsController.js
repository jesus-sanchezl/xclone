const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getTotalTweets = require("../../repositories/tweetsRepository/getTotalTweets");
const getUserById = require("../../repositories/usersRepository/getUserById");

const getTotalTweetsController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await idSchema.validateAsync(userId);

        const user = await getUserById(userId);
        if (!user) {
            throw generateError("Usuario no encontrado", 404);
        }

        const totalTweets = await getTotalTweets(userId);

        res.send({
            status: "ok",
            message: "Total de tweets obtenido correctamente",
            data: totalTweets,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getTotalTweetsController;
