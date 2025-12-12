const { getConnection } = require("../../database/database");

const getFollow = async (followerId, followedId) => {

    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT id
                FROM followers
                WHERE follower_id = ? AND followed_id = ?
            `,
            [followerId, followedId])

        return result.length > 0;
        
    } catch (error) {
        throw error;

    } finally {
        if (connection) connection.release();
    }

}


module.exports = getFollow;
