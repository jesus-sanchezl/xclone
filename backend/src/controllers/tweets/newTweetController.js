const path = require("path");

const { validateAndSaveMedia } = require("../../utils/validateAndSaveMedia");
const contentSchema = require("../../schemas/contentSchema");
const createTweet = require("../../repositories/tweetsRepository/createTweet");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const createOrGetHashtags = require("../../repositories/hashtagsRepository/createOrGetHashtags");
const associateTweetHashtags = require("../../repositories/hashtagsRepository/associateTweetHashtags");

const newTweetController = async (req, res, next) => {
    try {
        const { body } = req;
        await contentSchema.validateAsync(body);

        const userId = req.auth.id;
        const { content = "" } = body;

        let mediaName = null;

        if (req.files && req.files.media) {
            const tweetMediaDir = path.join(
                __dirname,
                "../../../public/tweetMedia"
            );
            mediaName = await validateAndSaveMedia(
                req.files.media,
                tweetMediaDir,
                /png|jpg|jpeg|webp|gif|mp4|mov/
            );
        }

        const tweetId = await createTweet(userId, content, mediaName);

        const hashtags = (content.match(/#[\p{L}0-9_]+/gu) || []).map((tag) =>
            tag.slice(1).toLowerCase()
        );

        if (hashtags.length > 0) {
            const hashtagsIds = await createOrGetHashtags(hashtags);

            await associateTweetHashtags(tweetId, hashtagsIds);
        }

        const tweet = await getTweetById(tweetId);

        res.send({
            status: "ok",
            message: `Tweet con id ${tweetId} creado correctamente`,
            data: tweet,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newTweetController;
