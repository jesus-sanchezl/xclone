const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getCommentById = require("../../repositories/commentsRepository/getCommentById");
const createCommentLike = require("../../repositories/likesCommentsRepository/createCommentLike");
const getUserCommentLike = require("../../repositories/likesCommentsRepository/getUserCommentLike");
const createCommentLikeNotification = require("../../repositories/notificationsRepository/createCommentLikeNotification");

const createCommentLikeController = async (req, res, next) => {
    try {
        const { id: commentId } = req.params;
        const userId = req.auth.id;

        await idSchema.validateAsync(commentId);

        const comment = await getCommentById(commentId, userId);
        if (!comment) {
            throw generateError(
                `El comentario con id ${commentId} no existe`,
                404
            );
        }

        const likeExists = await getUserCommentLike(userId, commentId);

        if (!likeExists) {
            await createCommentLike(userId, commentId);

            if (comment.userId !== userId) {
                await createCommentLikeNotification(
                    comment.userId,
                    userId,
                    commentId
                );
            }
        }

        const updatedComment = await getCommentById(commentId, userId);

        res.send({
            status: "ok",
            message: "Like añadido al comentario",
            data: {
                hasLike: true,
                likeCount: updatedComment.likeCount,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createCommentLikeController;
