const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");

const getSingleTweetController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await idSchema.validateAsync(id);

        const authUserId = req.auth.id;

        const tweet = await getTweetById(id, authUserId);
        if (!tweet) {
            throw generateError("Tweet no encontrado", 404);
        }

        res.send({
            status: "ok",
            message: "Tweet obtenido correctamente",
            data: tweet,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getSingleTweetController;
