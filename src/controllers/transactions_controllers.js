// import modules
const createError = require('http-errors');
const usersModel = require('../models/users_model');
const transactionsModel = require('../models/transactions_model');
const handleResponse = require('../helpers/common')

// create controller for show user's history
const showHistory = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const resultUser = await usersModel.findUser('id',idUser)
        console.log(resultUser)
        if (resultUser.length === 0) {
            return next(createError(403, `id ${idUser} not found`))
        } else {
            const resultHistory = await transactionsModel.showHistory(idUser);
            if (resultHistory.length === 0) {
                handleResponse.response(res, resultHistory, 200, `id ${idUser} transactions history empty`)
            } else {
                handleResponse.response(res, resultHistory, 200, 'successfullt fethced from server')
            }
        }
    } catch (error) {
       next(createError(500, new createError.InternalServerError())); 
    }
}

module.exports = {
    showHistory
}