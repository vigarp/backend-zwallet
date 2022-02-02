// import modules
const connection = require('../helpers/db_connection');


// create model for register user
const addUser = (dataUser) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users SET ?', dataUser, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};
// create model for find/handling user by email
const findUser = (field, record) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE ${field} = '${record}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        });
    });
};
// create model for see detail user
const detailUser = (idUser) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, username, email, phone, picture FROM users WHERE id = ${idUser}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}

// create model for get all user
const getAllUser = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, username, email, picture, phone FROM users;`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}

// create model for edit user
const editUser = (dataUser, idUser) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET ? WHERE id = ?', [dataUser, idUser], (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}
// export modules to controllers
module.exports = {
    addUser,
    findUser,
    detailUser,
    getAllUser,
    editUser
}