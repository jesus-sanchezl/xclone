const path = require("path");

const { generateError } = require("../../utils/helpers");
const { validateAndSaveMedia } = require("../../utils/validateAndSaveMedia");
const idSchema = require("../../schemas/idSchema");
const contentSchema = require("../../schemas/contentSchema");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");
const createComment = require("../../repositories/commentsRepository/createComment");
const createNotification = require("../../repositories/notificationsRepository/createNotification");
const getCommentById = require("../../repositories/commentsRepository/getCommentById");

const createCommentByIdTweetController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.auth.id;

        await idSchema.validateAsync(id);
        await contentSchema.validateAsync({ content });

        const tweet = await getTweetById(id);
        if (!tweet) {
            throw generateError(`El tweet con id ${id} no se encontró`, 404);
        }

        let mediaName = null;
        if (req.files && req.files.media) {
            const commentMediaDir = path.join(
                __dirname,
                "../../../public/commentMedia"
            );

            mediaName = await validateAndSaveMedia(
                req.files.media,
                commentMediaDir,
                /png|jpg|jpeg|webp|gif|mp4|mov/
            );
        }

        const commentId = await createComment(userId, id, content, mediaName);

        if (tweet.user_id !== userId) {
            await createNotification(tweet.user_id, "reply", userId, id);
        }

        const comment = await getCommentById(commentId);
        if (!comment) {
            throw generateError(
                "No se pudo recuperar el comentario recién creado",
                500
            );
        }

        res.send({
            status: "ok",
            message: `Comentario creado correctamente`,
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createCommentByIdTweetController;
