const path = require("path");
const fs = require("fs/promises");
const randomstring = require("randomstring");
const sharp = require("sharp");
const { generateError } = require("./helpers");

const validateAndSaveMedia = async (
    file,
    destinationDir,
    allowedExtensionsRegex = /png|jpg|jpeg|webp|gif|mp4|mov/
) => {
    const fileExtension = path.extname(file.name).toLowerCase();
    if (!allowedExtensionsRegex.test(fileExtension)) {
        throw generateError(
            "El archivo debe ser una imagen, video o GIF válido (png, jpg, jpeg, webp, gif, mp4, mov).",
            415
        );
    }

    try {
        await fs.access(destinationDir);
    } catch {
        await fs.mkdir(destinationDir, { recursive: true });
    }

    const randomName = randomstring.generate(20);

    if ([".png", ".jpg", ".jpeg", ".webp"].includes(fileExtension)) {
        const mediaName = `${randomName}.webp`;
        const mediaPath = path.join(destinationDir, mediaName);

        await sharp(file.data)
            .resize(1200, 675, {
                fit: "inside",
                withoutEnlargement: true,
            })
            .webp({ quality: 80 })
            .toFile(mediaPath);

        return mediaName;
    }

    const mediaName = `${randomName}${fileExtension}`;
    const mediaPath = path.join(destinationDir, mediaName);

    await file.mv(mediaPath);

    return mediaName;
};

module.exports = { validateAndSaveMedia };
