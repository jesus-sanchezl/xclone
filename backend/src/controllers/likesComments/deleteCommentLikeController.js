const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getCommentById = require("../../repositories/commentsRepository/getCommentById");
const deleteCommentLike = require("../../repositories/likesCommentsRepository/deleteCommentLike");
const getUserCommentLike = require("../../repositories/likesCommentsRepository/getUserCommentLike");

const deleteCommentLikeController = async (req, res, next) => {
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

        if (likeExists) {
            await deleteCommentLike(userId, commentId);
        }

        const updatedComment = await getCommentById(commentId, userId);

        res.send({
            status: "ok",
            message: "Like eliminado del comentario",
            data: {
                hasLike: false,
                likeCount: updatedComment.likeCount,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteCommentLikeController;
