const path = require("path");
const fs = require("fs/promises");
const { generateError } = require("../../utils/helpers");
const { validateAndSaveImage } = require("../../utils/validateAndSaveImage");
const getUserById = require("../../repositories/usersRepository/getUserById");
const uploadUserCoverImage = require("../../repositories/usersRepository/uploadUserCoverImage");



const coverImageDir = path.join(__dirname, "../../../public/coverImages");

const updateUserCoverImageController = async (req, res, next) => {
    try {
        const { id } = req.auth;

        const user = await getUserById(id);

        if (!user) {
            throw generateError("Usuario no encontrado", 400);
        }

        if (!req.files || !req.files.cover_image) {
            throw generateError("Debes enviar una imagen de portada", 400);
        }

        const cover_image = req.files.cover_image;

        const newImageName = await validateAndSaveImage(
            cover_image,
            /png|jpg|jpeg/,
            coverImageDir
        );

        if (user.cover_image) {
            const oldImagePath = path.join(coverImageDir, user.cover_image);

            try {
                await fs.unlink(oldImagePath);
            } catch (error) {
                console.error(
                    `No se pudo eliminar la imagen de portada anterior del usuario ${id}:`,
                    error.message
                );
            }
        }

        await uploadUserCoverImage(id, newImageName);

        res.send({
            status: "ok",
            message: "Imagen de portada actualizada correctamente",
            data: { cover_image: newImageName },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateUserCoverImageController;
