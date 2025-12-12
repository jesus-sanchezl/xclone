const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const deleteTweetLike = require("../../repositories/likesTweetsRepository/deleteTweetLike");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const getTweetLike = require("../../repositories/likesTweetsRepository/getTweetLike");

const deleteTweetLikeController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth.id;

        await idSchema.validateAsync(id);

        const tweet = await getTweetById(id);
        if (!tweet) {
            throw generateError(`El tweet con id ${id} no existe`, 404);
        }

        const alreadyLiked = await getTweetLike(userId, id);

        if (!alreadyLiked) {
            throw generateError("No habías dado like a este tweet", 400);
        }

        await deleteTweetLike(userId, id);

        const updatedTweet = await getTweetById(id);

        res.send({
            status: "ok",
            message: "Like eliminado del tweet",
            data: {
                hasLike: false,
                likeCount: updatedTweet.likeCount,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteTweetLikeController;
