const { getConnection } = require("../../database/database");

const deleteFollow = async (followerId, followedId) => {

    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                DELETE FROM followers
                WHERE follower_id = ? AND followed_id = ?
            `, 
            [followerId, followedId])

        return result.affectedRows > 0;
        
    } catch (error) {
        throw error;

    } finally {
        if(connection) connection.release();
    }


}



module.exports = deleteFollow;