const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const createRetweet = require("../../repositories/retweetRepository/createRetweet");
const createRetweetNotification = require("../../repositories/notificationsRepository/createRetweetNotification");
const getRetweetedTweet = require("../../repositories/retweetRepository/getRetweetedTweet");

const createRetweetController = async (req, res, next) => {
    try {
        const { tweetId } = req.params;
        const userId = req.auth.id;

        await idSchema.validateAsync(tweetId);

        const tweet = await getTweetById(tweetId);
        if (!tweet) {
            throw generateError(`El tweet con id ${tweetId} no existe`, 404);
        }

        const existingRetweet = await getRetweetedTweet(userId, tweetId);
        if (existingRetweet) {
            throw generateError("Ya has hecho retweet de este tweet", 409);
        }

        await createRetweet(userId, tweetId);

        if (tweet.user_id !== userId) {
            await createRetweetNotification(tweet.user_id, userId, tweetId);
        }

        const updatedTweet = await getTweetById(tweetId);

        res.send({
            status: "ok",
            message: "Retweet realizado con éxito",
            data: {
                isRetweeted: true,
                tweet: updatedTweet,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createRetweetController;
