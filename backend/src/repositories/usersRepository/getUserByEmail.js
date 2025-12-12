const { getConnection } = require("../../database/database");


const getUserByEmail = async (email) => {
    let connection;
    try {
        connection = await getConnection()

        const [rows] = await connection.query(
            `
                SELECT * FROM users WHERE email = ?
            `, 
            [email])

        if (rows.length === 0) {
            return null;
        }

        return rows[0]
        
    } catch (error) {
        throw error

    } finally {
        if (connection) connection.release()
    }


}


module.exports = getUserByEmail;