
const { getConnection } = require("../../database/database");

const getTweetById = async (tweetId, userId) => {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.query(
            `
            SELECT 
                tweets.id, 
                tweets.user_id, 
                tweets.content, 
                tweets.media_url, 
                tweets.created_at, 
                tweets.updated_at, 
                users.username, 
                users.profile_image, 
                users.name,
        
            
                (SELECT COUNT(*) FROM comments WHERE comments.tweet_id = tweets.id) AS commentCount,
        
            
                (SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id) AS likeCount, 
        
                
                (SELECT COUNT(*) FROM retweets WHERE retweets.tweet_id = tweets.id) AS retweetCount,
        
                
                EXISTS(
                    SELECT 1 FROM tweet_likes 
                    WHERE tweet_likes.tweet_id = tweets.id 
                    AND tweet_likes.user_id = ?
                ) AS hasLiked,
        
                
                EXISTS(
                    SELECT 1 FROM retweets 
                    WHERE retweets.tweet_id = tweets.id 
                    AND retweets.user_id = ?
                ) AS hasRetweeted
        
            FROM tweets
            LEFT JOIN users ON tweets.user_id = users.id 
            WHERE tweets.id = ?
        `,
            [userId, userId, tweetId]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getTweetById;
