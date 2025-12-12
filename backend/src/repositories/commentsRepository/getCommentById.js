const { getConnection } = require("../../database/database");

const getCommentById = async (commentId, userId = null) => {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.query(
            `
                SELECT 
                    comments.id AS commentId,
                    comments.user_id AS userId,
                    comments.tweet_id AS tweetId,
                    comments.content,
                    comments.media_url,
                    comments.created_at AS createdAt,
                    users.username,
                    users.name,
                    users.profile_image,
                    (SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id = comments.id) AS likeCount,
                    EXISTS(SELECT 1 FROM comment_likes WHERE comment_likes.comment_id = comments.id AND comment_likes.user_id = ?) AS hasLiked
                FROM 
                    comments
                INNER JOIN 
                    users 
                ON 
                    comments.user_id = users.id
                WHERE 
                    comments.id = ?
            `,
            [userId, commentId]
        );

        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getCommentById;
