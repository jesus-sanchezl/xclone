const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getUsersWhoLikedTweet = require("../../repositories/likesTweetsRepository/getUsersWhoLikedTweet");
const getTweetById = require("../../repositories/tweetsRepository/getTweetById");

const getUsersWhoLikedTweetController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await idSchema.validateAsync(id);

        const tweet = await getTweetById(id);
        if (!tweet) {
            throw generateError(`El tweet con id ${id} no existe`, 404);
        }

        const likedUsers = await getUsersWhoLikedTweet(id);

        res.send({
            status: "ok",
            message: "Usuarios que dieron like obtenidos correctamente",
            data: likedUsers,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUsersWhoLikedTweetController;
