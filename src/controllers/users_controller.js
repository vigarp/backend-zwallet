const createError = require('http-errors');
const handleResponse = require('../helpers/common');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// import modules from models
const usersModel = require('../models/users_model')

// create controller for register user
const addUser = async (req, res, next) => {
    try {
        const randomId = Math.floor(Math.random() * 999);
        const randomIdWallet = 'W-' + Math.floor(Math.random() * 999);
        const { username, email, password, phone } = req.body;
        const emailRegistered = await usersModel.findUser('email', email);
        const phoneRegistered = await usersModel.findUser('phone', phone);
        if ( username === undefined || email === undefined || password === undefined || phone === undefined || username === '' || email === '' || password === '') {
            return next(createError(403, 'Registration Failed, please check the input'));
        } else if (emailRegistered.length > 0) {
            return next(createError(403, 'Email Already Registered'));
        } else if (phoneRegistered.length > 0) {
            return next(createError(403, 'Phone Already Registered'));
        } else {
            const passwordHash = await bcrypt.hash(password, 10);
            const dataUSer = {
                id: randomId,
                username: username,
                email: email,
                password: passwordHash,
                phone: phone
            };
            await usersModel.addUser(dataUSer);
            const resultUser = {
                id: dataUSer.id,
                username: dataUSer.username,
                email: dataUSer.email
            }
            handleResponse.response(res, resultUser, 201, 'User Successfully Registered');
        }
    } catch (error) {
        console.log("dari controller =>", error)
        next(createError(500, new createError.InternalServerError()));
    }
}
// create controller for login user
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const [userRegistered] = await usersModel.findUser('email', email);
        console.log( userRegistered)
        if (!userRegistered) {
            return next(createError (403, 'Email/Password Wrong'))
        } else {
            const resultHash = await bcrypt.compare(password, userRegistered.password)
            if (!resultHash) return next(createError(403, 'Email/Password Wrong'));
            const secretKey = process.env.SECRET_KEY_JWT;
            const payload = {
                email: userRegistered.email,
                username: userRegistered.username,
                role: 'user'
            };
            const verifyOptions = {
                expiresIn: '1 days'
            };
            const token = jwt.sign(payload, secretKey, verifyOptions);
            const {id, username, email, phone, picture} = userRegistered;
            const result = {
                id,
                username,
                email,
                phone,
                picture,
                token: token
            };
            handleResponse.response(res, result, 200, 'Successfully Login');
        }
    } catch (error) {
        console.log(error);
        next(createError(500, new createError.InternalServerError()));
    }
}
// export modules to routes
module.exports = {
    addUser,
    loginUser
}