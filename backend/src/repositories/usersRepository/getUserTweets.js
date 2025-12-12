const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const getUserTweets = async (userId, authUserId) => {
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
                users.name AS name, 
                users.profile_image AS profile_image, 
                users.username AS username, 
                (SELECT COUNT(*) FROM comments WHERE comments.tweet_id = tweets.id) AS commentCount,
                (SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id) AS likeCount, 
                (SELECT COUNT(*) FROM retweets WHERE retweets.tweet_id = tweets.id) AS retweetCount, 
                EXISTS(
                    SELECT 1 
                    FROM tweet_likes 
                    WHERE tweet_likes.tweet_id = tweets.id 
                        AND tweet_likes.user_id = ?
                ) AS hasLiked,
                EXISTS(
                    SELECT 1 
                    FROM retweets 
                    WHERE retweets.tweet_id = tweets.id 
                        AND retweets.user_id = ?
                ) AS hasRetweeted,
                retweets.user_id AS retweeter_id, 
                retweeter_user.username AS retweeter_username,
                retweeter_user.profile_image AS retweeter_profile_image
            FROM tweets
            LEFT JOIN users 
                ON tweets.user_id = users.id 
            LEFT JOIN retweets 
                ON retweets.tweet_id = tweets.id 
                AND retweets.user_id = ?
            LEFT JOIN users AS retweeter_user 
                ON retweeter_user.id = retweets.user_id 
            WHERE tweets.user_id = ? OR retweets.user_id = ? 
            ORDER BY COALESCE(retweets.created_at, tweets.created_at) DESC


        `,
            [authUserId, authUserId, userId, userId, userId]
        );

        return rows;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUserTweets;
