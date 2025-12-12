const bcrypt = require("bcrypt");

const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const createUser = async (
    name,
    username,
    email,
    password,
    profile_image,
    bio,
    location,
    birthdate
) => {
    let connection;

    try {
        connection = await getConnection();

        const [existingUsers] = await connection.query(
            `
                SELECT id FROM users WHERE email = ?
            `,
            [email]
        );

        if (existingUsers.length > 0) {
            throw generateError("Este correo ya está en uso", 409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const [newUser] = await connection.query(
            ` INSERT INTO users (name, username, email, password, profile_image, bio, location, birthdate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                name,
                username,
                email,
                passwordHash,
                profile_image,
                bio,
                location,
                birthdate,
            ]
        );

        return newUser.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createUser;
