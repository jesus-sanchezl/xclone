const { getConnection } = require("../../database/database");

const  getUserCommentLike = async (userId, commentId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT id FROM comment_likes WHERE user_id = ? AND comment_id = ?
            `,
            [userId, commentId]
        );

         return result.length > 0;
         
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports =  getUserCommentLike;
