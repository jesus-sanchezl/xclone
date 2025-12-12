const { getConnection } = require("../../database/database");

const getTweetsByHashtag = async (hashtagName) => {
    let connection;

    try {
        connection = await getConnection();

        const [tweets] = await connection.query(
            `
                SELECT 
                    t.id, 
                    t.user_id AS userId, 
                    t.content, 
                    t.media_url AS mediaUrl, 
                    t.created_at AS createdAt, 
                    u.username AS username
                FROM tweets t
                JOIN tweet_hashtags th ON t.id = th.tweet_id
                JOIN hashtags h ON h.id = th.hashtag_id
                JOIN users u ON t.user_id = u.id
                WHERE h.name = ?
                ORDER BY t.created_at DESC

            `,
            [hashtagName]
        );

        return tweets;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getTweetsByHashtag;
