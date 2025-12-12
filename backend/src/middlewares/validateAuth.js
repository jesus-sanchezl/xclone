const jwt = require("jsonwebtoken");
const { generateError } = require("../utils/helpers");

const extractAccessToken = (headers) => {
    const { authorization } = headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw generateError(
            "Se requiere un token de autorización en la cabecera ",
            401
        );
    }

    return authorization.split(" ")[1];
};

const validateAuth = (req, res, next) => {
    try {
        const { JWT_SECRET } = process.env;
        const { headers } = req;

        const token = extractAccessToken(headers);

        const decodedToken = jwt.verify(token, JWT_SECRET);

        const { id, username, email } = decodedToken;
        req.auth = { id, username, email };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = validateAuth;
