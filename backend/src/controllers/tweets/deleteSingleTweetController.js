const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const deleteTweetById = require("../../repositories/tweetsRepository/deleteTweetById");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");

const deleteSingleTweetController = async (req, res, next) => {
    try {
        const { id } = req.params;

        await idSchema.validateAsync(id);

        const tweet = await getTweetById(id);
        if (!tweet) {
            throw generateError(`El tweet con id: ${id} no existe`, 404);
        }

        if (req.auth.id !== tweet.user_id) {
            throw generateError(
                "Estas intentando borrar un tweet que no es tuyo",
                403
            );
        }

        await deleteTweetById(id);

        res.send({
            status: "ok",
            message: `El tweet con id: ${id} fue borrado correctamente`,
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteSingleTweetController;
