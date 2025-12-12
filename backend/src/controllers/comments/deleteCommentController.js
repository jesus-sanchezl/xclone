const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const deleteCommentById = require("../../repositories/commentsRepository/deleteCommentById");
const getCommentById = require("../../repositories/commentsRepository/getCommentById");

const deleteCommentController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth.id;

        await idSchema.validateAsync(id);

        const comment = await getCommentById(id, userId);

        if (!comment) {
            throw generateError(`El comentario con id ${id} no existe`, 404);
        }

        if (comment.userId !== userId) {
            throw generateError(
                "Estás intentando borrar un comentario que no es tuyo",
                403
            );
        }

        await deleteCommentById(id);

        res.send({
            status: "ok",
            message: "Comentario eliminado correctamente",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteCommentController;
