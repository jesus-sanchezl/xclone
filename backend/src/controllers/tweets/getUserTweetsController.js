const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getUserById = require("../../repositories/usersRepository/getUserById");
const getUserTweets = require("../../repositories/usersRepository/getUserTweets");

const getUserTweetsController = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const authUserId = req.auth.id;

        await idSchema.validateAsync(user_id);

        const user = await getUserById(user_id);
        if (!user) {
            throw generateError("Usuario no encontrado", 404);
        }

        const tweets = await getUserTweets(user_id, authUserId);

        res.send({
            status: "ok",
            message: "Tweets del usuario obtenidos",
            data: tweets,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserTweetsController;
