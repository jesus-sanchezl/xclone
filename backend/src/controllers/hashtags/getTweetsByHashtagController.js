const { generateError } = require("../../utils/helpers");
const getTweetsByHashtag = require("../../repositories/hashtagsRepository/getTweetsByHashtag");

const getTweetsByHashtagController = async (req, res, next) => {
    try {
        const { name } = req.params;

        if (!name || !name.startsWith("#")) {
            throw generateError(
                "El nombre del hashtag debe comenzar con '#'",
                400
            );
        }

        if (name.length < 2) {
            throw generateError("El hashtag es demasiado corto", 400);
        }

        if (name.length > 50) {
            throw generateError("El hashtag es demasiado largo", 400);
        }

        const hashtagRegex = /^#[\p{L}0-9_]+$/u;
        if (!hashtagRegex.test(name)) {
            throw generateError(
                "El hashtag contiene caracteres no permitidos",
                400
            );
        }

        const normalizedName = name.slice(1).toLowerCase();

        const tweets = await getTweetsByHashtag(normalizedName);

        if (tweets.length === 0) {
            return res.send({
                status: "ok",
                message: `No hay tweets asociados al hashtag ${name}`,
                data: [],
            });
        }

        res.send({
            status: "ok",
            message: "Tweets obtenidos correctamente",
            data: tweets,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getTweetsByHashtagController;
