const { getConnection } = require("../../database/database");

const getUsersWhoLikedComment = async (commentId) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `
                SELECT 
                    users.id AS userId, 
                    users.username, 
                    users.profile_image AS profileImage
                FROM comment_likes
                INNER JOIN users ON comment_likes.user_id = users.id
                WHERE comment_likes.comment_id = ?
                ORDER BY comment_likes.created_at DESC
            `,
            [commentId])

        return users;
        
    } catch (error) {
        throw error;

    } finally {
        if (connection) connection.release();
    }


}

module.exports = getUsersWhoLikedComment;