const { getConnection } = require("../../database/database");

const getCommentsById = async (tweetId, userId) => {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.query(
            `
                SELECT 
                comments.id AS commentId,
                comments.content,
                comments.media_url,
                comments.created_at AS createdAt,
                users.name,
                users.username,
                users.profile_image,
                comments.user_id AS userId,
                (SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id = comments.id) AS likeCount, 
                EXISTS(
                    SELECT 1 FROM comment_likes 
                    WHERE comment_likes.comment_id = comments.id 
                    AND comment_likes.user_id = ?
                ) AS hasLiked 
                FROM comments
                INNER JOIN users ON comments.user_id = users.id
                WHERE comments.tweet_id = ?
                ORDER BY comments.created_at DESC;

    `,
            [userId, tweetId]
        );

        return rows;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getCommentsById;
