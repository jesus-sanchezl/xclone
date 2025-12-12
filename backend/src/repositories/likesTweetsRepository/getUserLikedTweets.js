const { getConnection } = require("../../database/database");

const getUserLikedTweets = async (userId) => {
    let connection;

    try {

        connection = await getConnection();

        const [tweets] = await connection.query(
            `             
                SELECT 
                    tweets.id AS tweetId, 
                    tweets.content, 
                    tweets.media_url, 
                    tweets.created_at,
                    users.id AS authorId, 
                    users.username, 
                    users.profile_image
                FROM tweet_likes
                INNER JOIN tweets ON tweet_likes.tweet_id = tweets.id
                INNER JOIN users ON tweets.user_id = users.id
                WHERE tweet_likes.user_id = ?
                ORDER BY tweet_likes.created_at DESC

            `, 
            [userId])
        
        return tweets;
        
    } catch (error) {
        throw error;

    } finally {
        if (connection) connection.release();
    }



}


module.exports = getUserLikedTweets;