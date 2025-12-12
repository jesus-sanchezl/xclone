const { getConnection } = require("../../database/database");

const updateUserById = async (data) => {
    let connection;

    const { id, name, username, bio, location, birthdate } = data;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                UPDATE users
                SET name =?, username = ?, bio = ?, location = ?, birthdate = ?
                WHERE id = ?
            `,
            [name, username, bio, location, birthdate, id]
        );

        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserById;
