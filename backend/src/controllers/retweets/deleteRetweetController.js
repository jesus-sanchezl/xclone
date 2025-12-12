const deleteRetweet = require("../../repositories/retweetRepository/deleteRetweet");
const getRetweetedTweet = require("../../repositories/retweetRepository/getRetweetedTweet");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const idSchema = require("../../schemas/idSchema");
const { generateError } = require("../../utils/helpers");

const deleteRetweetController = async (req, res, next) => {
    try {
        const { tweetId } = req.params;
        const userId = req.auth.id;

        await idSchema.validateAsync(tweetId);

        const retweet = await getRetweetedTweet(userId, tweetId);
        if (!retweet) {
            throw generateError("No has hecho retweet de este tweet", 404);
        }

        await deleteRetweet(userId, tweetId);

        const updatedTweet = await getTweetById(tweetId);

        res.send({
            status: "ok",
            message: "Retweet eliminado correctamente",
            data: {
                isRetweeted: false,
                tweet: updatedTweet,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteRetweetController;
