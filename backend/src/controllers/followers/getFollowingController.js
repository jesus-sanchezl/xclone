const idSchema = require("../../schemas/idSchema");
const getFollowing = require("../../repositories/followersRepository/getFollowing");

const getFollowingController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await idSchema.validateAsync(userId);

        const userIdNumber = Number(userId);

        const followingUsers = await getFollowing(userIdNumber);
        if (followingUsers.length === 0) {
            return res.send({
                status: "ok",
                message: `El usuario con id ${userId} no sigue a nadie`,
                data: [],
            });
        }

        res.send({
            status: "ok",
            message: "Usuarios seguidos obtenidos correctamente",
            data: followingUsers,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getFollowingController;
