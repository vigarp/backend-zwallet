// import modules
const express = require('express');
const route = express.Router();
// import modules from controllers
const userController = require('../controllers/users_controller');


// declare router

route
    .get('/:id', userController.detailUser)
    .get('/', userController.getAllUser)
    .put('/:id', userController.editUser)
    .delete('/:id', userController.deleteUser)




module.exports = route;