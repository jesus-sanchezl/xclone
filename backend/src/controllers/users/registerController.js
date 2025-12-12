const { validateAndSaveImage } = require("../../utils/validateAndSaveImage");
const userSchema = require("../../schemas/userSchema");
const createUser = require("../../repositories/usersRepository/createUser");


const registerController = async (req, res, next) => {
    try {
        const { body } = req;
        await userSchema.validateAsync(body);

        let imageName = null;
        if (req.files && req.files.profile_image) {
            const { profile_image } = req.files;
            imageName = await validateAndSaveImage(profile_image);
        }

        const { name, username, email, password, bio, location, birthdate } =
            body;

        const id = await createUser(
            name,
            username,
            email,
            password,
            imageName,
            bio,
            location,
            birthdate
        );

        res.send({
            status: "ok",
            message: `User created with id: ${id}`,
            data: {
                id,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = registerController;
