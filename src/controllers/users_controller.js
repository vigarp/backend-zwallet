const createError = require('http-errors');
const handleResponse = require('../helpers/common')
// import modules from models
const usersModel = require('../models/users_model')

// create controller for register user
const addUser = async (req, res, next) => {
    try {
        const randomId = Math.floor(Math.random() * 999);
        const randomIdWallet = 'W-' + Math.floor(Math.random() * 999);
        const { username, email, password, phone } = req.body;
        // add for email validation if already registered feature if-else
        const dataUSer = {
            id: randomId,
            username: username,
            email: email,
            password: password,
            phone: phone
        };
        await usersModel.addUser(dataUSer);
        const resultUser = {
            id: dataUSer.id,
            username: dataUSer.username,
            email: dataUSer.email
        }
        handleResponse.response(res, resultUser, 201, 'User Successfully Registered');
    } catch (error) {
        next(createError(500, new createError.InternalServerError()));
        console.log("dari controller =>", error)
    }
}

// export modules for routes
module.exports = {
    addUser
}