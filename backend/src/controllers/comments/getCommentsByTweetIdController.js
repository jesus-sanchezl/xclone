const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const getCommentsById = require("../../repositories/commentsRepository/getCommentsById");

const getCommentsByTweetIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await idSchema.validateAsync(id);

        const userId = req.auth.id;

        const tweet = await getTweetById(id);
        if (!tweet) {
            throw generateError(`El tweet con id ${id} no se encontró`, 404);
        }

        const comments = await getCommentsById(id, userId);

        res.send({
            status: "ok",
            message: "Comentarios obtenidos correctamente",
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getCommentsByTweetIdController;
