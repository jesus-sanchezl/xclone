const getAllUsers = require("../../repositories/usersRepository/getAllUsers");

const getUsersController = async (req, res, next) => {

    try {

        const users = await getAllUsers()
        


        res.send({
            status: 'ok',
            message: "Usuarios obtenidos correctamente",
            data: users
        })
    } catch (error) {
        next(error)
    }


}


module.exports = getUsersController;