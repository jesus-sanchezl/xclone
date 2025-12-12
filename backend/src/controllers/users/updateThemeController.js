const { generateError } = require("../../utils/helpers");
const updateTheme = require("../../repositories/usersRepository/updateTheme");

const updateThemeController = async (req, res, next) => {
    try {
        if (!req.auth || !req.auth.id) {
            throw generateError("No autorizado", 401);
        }
        const { id } = req.auth;
        const { theme } = req.body;

        if (!["light", "dark"].includes(theme)) {
            throw generateError("El tema debe ser 'light' o 'dark'", 400);
        }

        await updateTheme(id, theme);

        res.send({
            status: "ok",
            message: "Tema actualizado correctamente",
            data: { theme },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateThemeController;
