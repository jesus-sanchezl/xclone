const { getConnection } = require("../../database/database");

const getUserByUsername = async (username) => {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.query(
            `
                SELECT * FROM users WHERE username = ?
            `,
            [username]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUserByUsername;
