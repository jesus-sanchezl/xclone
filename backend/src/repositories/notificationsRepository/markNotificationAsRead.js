const { getConnection } = require("../../database/database");

const markNotificationAsRead = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                UPDATE notifications
                SET read_at = NOW()
                WHERE id = ?
            `,
            [id]
        );
        return result.affectedRows;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = markNotificationAsRead;
