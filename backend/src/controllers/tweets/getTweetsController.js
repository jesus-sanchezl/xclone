const getAllTweets = require("../../repositories/tweetsRepository/getAllTweets");

const getTweetsController = async (req, res, next) => {
    try {
        const authUserId = req.auth.id;

        const tweets = await getAllTweets(authUserId);

        res.send({
            status: "ok",
            message: "Tweets obtenidos correctamente",
            data: tweets,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getTweetsController;
