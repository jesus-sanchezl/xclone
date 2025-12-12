const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getCommentById = require("../../repositories/commentsRepository/getCommentById");
const getUsersWhoLikedComment = require("../../repositories/likesCommentsRepository/getUsersWhoLikedComment");

const getUsersWhoLikedCommentController = async (req, res, next) => {
    try {
        const { id: commentId } = req.params;
        await idSchema.validateAsync(commentId);

        const comment = await getCommentById(commentId);
        if (!comment) {
            throw generateError(
                `El comentario con id ${commentId} no existe`,
                404
            );
        }

        const users = await getUsersWhoLikedComment(commentId);

        res.send({
            status: "ok",
            message:
                "Usuarios que han dado like al comentario obtenidos correctamente",
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUsersWhoLikedCommentController;
