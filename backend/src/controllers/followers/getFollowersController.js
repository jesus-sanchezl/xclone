const idSchema = require("../../schemas/idSchema");
const getFollowers = require("../../repositories/followersRepository/getFollowers");

const getFollowersController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await idSchema.validateAsync(userId);

        const userIdNumber = Number(userId);

        const followers = await getFollowers(userIdNumber);
        if (followers.length === 0) {
            return res.send({
                status: "ok",
                message: `El usuario con ID ${userId} no tiene seguidores`,
                data: [],
            });
        }

        res.send({
            status: "ok",
            message: "Seguidores obtenidos correctamente",
            data: followers,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getFollowersController;
