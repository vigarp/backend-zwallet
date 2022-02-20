// import modules
const createError = require('http-errors');
const usersModel = require('../models/users_model');
const walletsModel = require('../models/wallets_model');
const transactionsModel = require('../models/transactions_model');
const handleResponse = require('../helpers/common');

// create controller for show user's history
const showHistory = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const orderQuery = req.query.order || 'DESC';
        const limitQuery = req.query.limit || 4;
        const resultUser = await usersModel.findUser('id',idUser)
        if (resultUser.length === 0) {
            return next(createError(403, `id ${idUser} not found`))
        } else {
            const resultHistory = await transactionsModel.showHistory(idUser, orderQuery, limitQuery);
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

// create controller for transfer between users
const createTransfer = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const idReceiver = req.body.receiver
        const amount = req.body.amount
        const notes = req.body.notes

        const [grabSenderBalance] = await walletsModel.grabBalanceWallet(idUser);
        const [grabReceiverBalance] = await walletsModel.grabBalanceWallet(idReceiver);
        const randomInv = 'INV-' + Math.floor(Math.random() * 999);

        const dataTransfer = {
            invoice: randomInv,
            id_sender: idUser,
            id_receiver: idReceiver,
            type: 'Transfer',
            amount: amount,
            created_at: new Date(),
            notes: notes
        }
        if (grabSenderBalance.balance < amount) {
            handleResponse.response(res, null, 403, 'Current Balance Not Enough, Please Topup')
        } else {
            await walletsModel.substractWallet(idUser, amount);
            await walletsModel.topUpWallet(idReceiver, amount);
            await transactionsModel.createTransfer(dataTransfer);

            const resultTransfer = {
                invoice: dataTransfer.invoice,
                receiver: dataTransfer.id_receiver,
                balance: grabSenderBalance.balance - amount,
                notes: dataTransfer.notes
            };
            handleResponse.response(res, [resultTransfer], 200, `Successfully Transfered`)
        }
    } catch (error) {
        next(createError(500, new createError.InternalServerError())); 
    }
}
module.exports = {
    showHistory,
    createTransfer
}