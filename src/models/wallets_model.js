// import modules
const connection = require('../helpers/db_connection');

// create models for add wallet while user registered
const addWallet = (randomIdWallet, idUser) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO wallets SET ?', {id: randomIdWallet, id_user: idUser}, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error)
            }
        })
    })
}
// create models for see wallet for detail user
const seeWallet = (idUser) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM wallets WHERE id_user = ${idUser}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}

// create models for top-up wallet user
const topUpWallet = (idUser, amount) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE wallets SET balance = balance + ? WHERE id_user = ?', [amount, idUser], (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(errror);
                reject(error)
            }
        })
    })
}
// export modules to controllers
module.exports = {
    addWallet,
    seeWallet,
    topUpWallet
}