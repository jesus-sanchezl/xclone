const idSchema = require("../../schemas/idSchema");
const getUserLikedTweets = require("../../repositories/likesTweetsRepository/getUserLikedTweets");

const getUserLikedTweetsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await idSchema.validateAsync(id);

        const tweets = await getUserLikedTweets(id);

        res.send({
            status: "ok",
            message: "Tweets con like del usuario obtenidos correctamente",
            data: tweets,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserLikedTweetsController;
