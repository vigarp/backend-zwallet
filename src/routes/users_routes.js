// import modules
const express = require('express');
const route = express.Router();
// import modules from controllers
const userController = require('../controllers/users_controller');
const { protect, isAdmin } = require('../middleware/auth');


// declare router

route
    .get('/', protect, userController.getAllUser)
    .get('/:id', protect, userController.detailUser)
    .put('/:id', protect, userController.editUser)
    .delete('/:id', protect, isAdmin, userController.deleteUser)




module.exports = route;