const path = require("path");
const fs = require("fs/promises");

const { generateError } = require("../../utils/helpers");
const { validateAndSaveImage } = require("../../utils/validateAndSaveImage");

const getUserById = require("../../repositories/usersRepository/getUserById");
const uploadUserImage = require("../../repositories/usersRepository/uploadUserImage");



const profileImagesDir = path.join(__dirname, "../../../public/profileImages");

const updateUserImageController = async (req, res, next) => {
    try {
        const { id } = req.auth;

        const user = await getUserById(id);
        if (!user) {
            throw generateError("Usuario no encontrado", 400);
        }

        if (!req.files || !req.files.profile_image) {
            throw generateError("Debes enviar una imagen", 400);
        }

        const profile_image = req.files.profile_image;
        const newImageName = await validateAndSaveImage(profile_image);

        if (user.profile_image) {
            const oldImagePath = path.join(profileImagesDir, user.profile_image);

            try {
                await fs.unlink(oldImagePath);
            } catch (error) {
                console.error(
                    `No se pudo eliminar la imagen anterior del usuario ${id}:`,
                    error.message
                );
            }
        }

        await uploadUserImage(id, newImageName);

        res.send({
            status: "ok",
            message: "Imagen de usuario actualizada correctamente",
            data: { image: newImageName },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateUserImageController;
