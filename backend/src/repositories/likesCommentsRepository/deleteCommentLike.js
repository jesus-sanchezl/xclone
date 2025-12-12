const { getConnection } = require("../../database/database");

const deleteCommentLike = async (userId, commentId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?
            `,
            [userId, commentId]
        );

        return result;
        
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteCommentLike;
