const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const createTweetLike = require("../../repositories/likesTweetsRepository/createTweetLike");
const createTweetLikeNotification = require("../../repositories/notificationsRepository/createTweetLikeNotification");
const getTweetLike = require("../../repositories/likesTweetsRepository/getTweetLike");

const createTweetLikeController = async (req, res, next) => {
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
            await createTweetLike(userId, id);

            if (tweet.user_id !== userId) {
                await createTweetLikeNotification(tweet.user_id, userId, id);
            }
        }

        const updatedTweet = await getTweetById(id);

        res.send({
            status: "ok",
            message: "Like añadido al tweet",
            data: {
                hasLike: true,
                likeCount: updatedTweet.likeCount,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createTweetLikeController;
