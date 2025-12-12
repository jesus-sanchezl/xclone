const { getConnection } = require("../../database/database");

const createCommentLike = async (userId, commentId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                INSERT INTO comment_likes (user_id, comment_id) 
                VALUES (?, ?)
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

module.exports = createCommentLike;
