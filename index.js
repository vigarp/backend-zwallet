// import modules
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const app = express();

const handleURL = require('./src/helpers/common')
const handleResponse = require('./src/helpers/common')
const userRoutes = require('./src/routes/users_routes');
const usersController = require('./src/controllers/users_controller');

// using app method
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// app.use('/users', userRoutes);
app.post('/register', usersController.addUser);
app.post('/login', usersController.loginUser);

app.use(handleURL.urlNotFound);
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    handleResponse.response(res, null, statusCode, message);
    console.log(err);
})

app.listen(PORT, () => {
    console.log(`server starting on port ${PORT}`);
});