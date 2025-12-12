const getAllHashtags = require("../../repositories/hashtagsRepository/getAllHashtags");

const getAllHashtagsController = async (req, res, next) => {
    try {
        const hashtags = await getAllHashtags();

        if (hashtags.length === 0) {
            return res.send({
                status: "ok",
                message: "No hay hashtags disponibles",
                data: [],
            });
        }

        res.send({
            status: "ok",
            message: "Hashtags obtenidos correctamente",
            data: hashtags,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAllHashtagsController;
