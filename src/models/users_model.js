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

// export modules for controllers
module.exports = {
    addUser
}