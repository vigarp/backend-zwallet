// import modules
const express = require('express');
const route = express.Router();

// import route module from user_routes & usersController
const userRoutes = require('./users_routes');
const usersController = require('../controllers/users_controller');
// declare router

route.use('/users', userRoutes)
route.post('/register', usersController.addUser);
route.post('/login', usersController.loginUser);

module.exports = route