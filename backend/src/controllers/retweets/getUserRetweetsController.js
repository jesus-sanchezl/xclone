const getUserRetweets = require("../../repositories/retweetRepository/getUserRetweets");
const idSchema = require("../../schemas/idSchema");

const getUserRetweetsController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await idSchema.validateAsync(userId);

        const retweets = await getUserRetweets(userId);

        res.send({
            status: "ok",
            message: "Retweets del usuario obtenidos correctamente",
            data: retweets,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserRetweetsController;
