const { getConnection } = require("../../database/database");

const getAllUsers = async () => {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.query(`

                SELECT id, username, profile_image, location, birthdate FROM users
            `);

        return rows;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getAllUsers;
