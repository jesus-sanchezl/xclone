const path = require("path");
const fs = require("fs/promises");

const { generateError } = require("../../utils/helpers");
const { validateAndSaveMedia } = require("../../utils/validateAndSaveMedia");
const idSchema = require("../../schemas/idSchema");
const contentSchema = require("../../schemas/contentSchema");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const updateTweet = require("../../repositories/tweetsRepository/updateTweet");

const updateTweetController = async (req, res, next) => {
    try {
        const { body } = req;
        await contentSchema.validateAsync(body);

        const tweetId = req.params.id;
        await idSchema.validateAsync(tweetId);

        const { content } = body;

        const userId = req.auth.id;

        const tweet = await getTweetById(tweetId);
        if (!tweet) {
            throw generateError(`El tweet con id ${tweetId} no existe`, 404);
        }

        if (tweet.user_id !== userId) {
            throw generateError(
                "No tienes permisos para actualizar este tweet",
                403
            );
        }

        let mediaName = tweet.media_url;
        const tweetMediaDir = path.join(
            __dirname,
            "../../../public/tweetMedia"
        );

        if (req.files && req.files.media) {
            if (tweet.media_url) {
                const oldMediaPath = path.join(tweetMediaDir, tweet.media_url);

                try {
                    await fs.unlink(oldMediaPath);
                } catch (error) {
                    console.error(
                        `Error al borrar el archivo antiguo ${oldMediaPath}:`,
                        error.message
                    );
                }
            }

            mediaName = await validateAndSaveMedia(
                req.files.media,
                tweetMediaDir,
                /png|jpg|jpeg|webp|gif|mp4|mov/
            );
        }

        await updateTweet(tweetId, content, mediaName);

        const updatedTweet = await getTweetById(tweetId);

        res.send({
            status: "ok",
            message: `Tweet con id ${tweetId} actualizado correctamente`,
            data: updatedTweet,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateTweetController;
