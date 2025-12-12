const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const deleteFollow = require("../../repositories/followersRepository/deleteFollow");
const getFollow = require("../../repositories/followersRepository/getFollow");
const getUserById = require("../../repositories/usersRepository/getUserById");

const unfollowUserController = async (req, res, next) => {
    try {
        const { followedId } = req.params;
        const userId = req.auth.id;

        await idSchema.validateAsync(followedId);

        const followedIdNumber = Number(followedId);
        const userIdNumber = Number(userId);

        const followedUser = await getUserById(followedIdNumber);
        if (!followedUser) {
            throw generateError(
                `El usuario con id ${followedId} no existe`,
                404
            );
        }

        const followExists = await getFollow(userIdNumber, followedIdNumber);
        if (!followExists) {
            throw generateError("No sigues a este usuario", 400);
        }

        await deleteFollow(userIdNumber, followedIdNumber);

        res.send({
            status: "ok",
            message: "Has dejado de seguir a este usuario",
            data: { followedId: followedIdNumber },

        });
    } catch (error) {
        next(error);
    }
};

module.exports = unfollowUserController;
