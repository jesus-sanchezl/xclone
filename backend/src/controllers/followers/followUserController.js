const { generateError } = require("../../utils/helpers");
const idSchema = require("../../schemas/idSchema");
const getUserById = require("../../repositories/usersRepository/getUserById");
const getFollow = require("../../repositories/followersRepository/getFollow");
const createFollow = require("../../repositories/followersRepository/createFollow");
const createNotification = require("../../repositories/notificationsRepository/createNotification");

const followUserController = async (req, res, next) => {
    try {
        const { followedId } = req.params;
        const userId = req.auth.id;

        await idSchema.validateAsync(followedId);

        const followedIdNumber = Number(followedId);
        const userIdNumber = Number(userId);

        if (userIdNumber === followedIdNumber) {
            throw generateError("No puedes seguirte a ti mismo", 400);
        }

        const followedUser = await getUserById(followedIdNumber);
        if (!followedUser) {
            throw generateError(
                `El usuario con ID ${followedId} no existe`,
                404
            );
        }

        const followExists = await getFollow(userIdNumber, followedIdNumber);
        if (followExists) {
            throw generateError("Ya sigues a este usuario", 400);
        }

        const followId = await createFollow(userIdNumber, followedIdNumber);

        await createNotification(followedIdNumber, "follow", userIdNumber);

        res.send({
            status: "ok",
            message: "Ahora sigues a este usuario",
            data: { followId, followedId: followedIdNumber },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = followUserController;
