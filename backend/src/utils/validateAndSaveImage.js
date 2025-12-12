const path = require("path");
const fs = require("fs/promises");

const randomstring = require("randomstring");
const sharp = require("sharp");

const { generateError } = require("./helpers.js");

const profileImagesDir = path.join(__dirname, "../../public/profileImages");

const validateAndSaveImage = async (
    image,
    allowedExtensionsRegex = /png|jpg|jpeg/,
    directory = profileImagesDir
) => {
    const fileExtension = path.extname(image.name).toLowerCase();
    if (!allowedExtensionsRegex.test(fileExtension)) {
        throw generateError(
            "El archivo debe ser una imagen (png, jpg o jpeg).",
            400
        );
    }

    try {
        await fs.access(directory);
    } catch {
        await fs.mkdir(directory, { recursive: true });
    }

    const randomName = randomstring.generate(20);
    const imageName = `${randomName}.webp`;
    const imagePath = path.join(directory, imageName);

    await sharp(image.data)
        .resize(1200, 675, {
            fit: "inside",
            withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(imagePath);

    return imageName;
};

module.exports = {
    validateAndSaveImage,
};
