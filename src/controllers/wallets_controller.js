// import from models
const walletsModel = require('../models/wallets_model');
const usersModel = require('../models/users_model');
const transactionsModel = require('../models/transactions_model');

// import modules
const handleResponse = require('../helpers/common');
const createError = require('http-errors');

// create controllers for top-up wallet
const topUpWallet = async (req, res, next) => {
    try {
        const id_user =req.params.id;
        const amount = req.body.amount;
        const randomInv = 'INV-' + Math.floor(Math.random() * 999);
        await walletsModel.topUpWallet(id_user, amount);
        const dataTransfer = {
            invoice: randomInv,
            id_sender: id_user,
            id_receiver: null,
            type: 'Topup',
            amount: amount,
            created_at: new Date()
        };
        await transactionsModel.createTransfer(dataTransfer);
        const [walletRegistered] = await walletsModel.seeWallet(id_user)
        const resultInvoice = {
            inv: dataTransfer.invoice,
            id: dataTransfer.id_sender,
            type: dataTransfer.type,
            amount: dataTransfer.amount,
            date: dataTransfer.created_at,
            balance: walletRegistered.balance
        }
        handleResponse.response(res, resultInvoice, 200, 'top-up success');
    } catch (error) {
        next(createError(500, new createError.InternalServerError()));
    }
}


// export module to routes
module.exports = {
    topUpWallet
}