const { getConnection } = require("../../database/database");

const deleteNotification = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                DELETE FROM notifications
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

module.exports = deleteNotification;
