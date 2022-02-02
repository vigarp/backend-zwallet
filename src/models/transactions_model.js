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

// export models to controllers
module.exports = {
    createTransfer
}