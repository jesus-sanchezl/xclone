const getRetweets = require("../../repositories/retweetRepository/getRetweets");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const idSchema = require("../../schemas/idSchema");
const { generateError } = require("../../utils/helpers");

const getRetweetsController = async (req, res, next) => {
    try {
        const { tweetId } = req.params;
        await idSchema.validateAsync(tweetId);

        const tweet = await getTweetById(tweetId);
        if (!tweet) {
            throw generateError(`El tweet con id ${tweetId} no existe`, 404);
        }

        const retweets = await getRetweets(tweetId);

        res.send({
            status: "ok",
            message: "Retweets obtenidos correctamente",
            data: retweets,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getRetweetsController;
