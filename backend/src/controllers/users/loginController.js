const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateError } = require("../../utils/helpers");
const getUserByEmail = require("../../repositories/usersRepository/getUserByEmail");
const loginSchema = require("../../schemas/loginSchema");

const INVALID_CREDENTIALS_MSG = "Credenciales inválidas. Inténtalo de nuevo.";

const loginController = async (req, res, next) => {
    try {
        const { body } = req;
        await loginSchema.validateAsync(body);

        const { email, password } = body;

        const user = await getUserByEmail(email);
        if (!user) {
            throw generateError(INVALID_CREDENTIALS_MSG, 401);
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw generateError(INVALID_CREDENTIALS_MSG, 401);
        }

        const { id, username } = user;
        const { JWT_SECRET, TOKEN_EXPIRY_TIME = "1d" } = process.env;
        const payload = { id, username, email };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: TOKEN_EXPIRY_TIME,
        });

        res.send({
            status: "ok",
            message: "Inicio de sesión exitoso",
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = loginController;
