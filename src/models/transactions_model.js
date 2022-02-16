// import modules
const connection = require('../helpers/db_connection');


// create model for trasaction history
const createTransfer = (dataTransfer) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO transactions SET ?', dataTransfer, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}
// create model for showing user's history
const showHistory = (idUser, orderQuery, limitQuery) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT transactions.invoice, transactions.id_sender,transactions.id_receiver, IF(transactions.id_sender = ${idUser}, u1.username, u2.username) as username,  IF(transactions.id_sender = ${idUser}, u1.picture, u2.picture) as picture, transactions.type, IF(transactions.type = 'Topup', 'Topup', IF(transactions.id_sender = ${idUser}, 'Transfer Out', 'Transfer In')) as type_detail, transactions.amount, transactions.notes, transactions.created_at FROM transactions LEFT JOIN users u1 ON (u1.id = transactions.id_receiver) LEFT JOIN users u2 ON (u2.id = transactions.id_sender) WHERE (id_sender=${idUser} OR id_receiver=${idUser}) ORDER BY created_at ${orderQuery} LIMIT ${limitQuery};`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                console.log(error);
                reject(error)
            }
        })
    })
}
// export models to controllers
module.exports = {
    createTransfer,
    showHistory
}