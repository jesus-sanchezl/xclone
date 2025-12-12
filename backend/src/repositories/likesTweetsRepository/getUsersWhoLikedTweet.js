const { getConnection } = require("../../database/database");

const getUsersWhoLikedTweet = async (tweetId) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `
                SELECT 
                    users.id AS userId, 
                    users.username, 
                    users.profile_image AS profileImage
                FROM tweet_likes
                INNER JOIN users ON tweet_likes.user_id = users.id
                WHERE tweet_likes.tweet_id = ?
                ORDER BY tweet_likes.created_at DESC

            `,
            [tweetId]
        );

        return users;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUsersWhoLikedTweet;
