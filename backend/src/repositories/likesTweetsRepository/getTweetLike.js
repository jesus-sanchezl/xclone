const { getConnection } = require("../../database/database");

const getTweetLike  = async (userId, tweetId) => {

    let connection; 

    try {

        connection = await getConnection();

        const [ rows ] = await connection.query(`

                 SELECT id FROM tweet_likes WHERE user_id = ? AND tweet_id = ?
            `, 
            [userId, tweetId])
        
        return rows.length > 0 ? rows[0] : null
        
    } catch (error) {
        throw error;

    } finally {
        if (connection) connection.release();
    }

}


module.exports = getTweetLike ;