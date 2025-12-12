const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getCommentById = require("../../repositories/commentsRepository/getCommentById");

const getSingleCommentController = async (req, res, next) => {
    try {
        const { id } = req.params;

        await idSchema.validateAsync(id);

        const userId = req.auth.id;

        const comment = await getCommentById(id, userId);
        if (!comment) {
            throw generateError(
                `El comentario con id ${id} no se encontró`,
                404
            );
        }

        res.send({
            status: "ok",
            message: "Comentario obtenido correctamente",
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getSingleCommentController;
