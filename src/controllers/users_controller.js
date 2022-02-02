const createError = require('http-errors');
const handleResponse = require('../helpers/common');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// import modules from models
const usersModel = require('../models/users_model');
const walletsModel = require('../models/wallets_model');
const { handle } = require('express/lib/router');

// create controller for register user
const addUser = async (req, res, next) => {
    try {
        const randomId = Math.floor(Math.random() * 999);
        const randomIdWallet = 'W-' + Math.floor(Math.random() * 999);
        const { username, email, password, phone } = req.body;
        const emailRegistered = await usersModel.findUser('email', email);
        const phoneRegistered = await usersModel.findUser('phone', phone);
        if (username === undefined || email === undefined || password === undefined || phone === undefined || username === '' || email === '' || password === '') {
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
            await walletsModel.addWallet(randomIdWallet, dataUSer.id);
            const resultUser = {
                id_user: dataUSer.id,
                id_wallet: randomIdWallet,
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
        const { email, password } = req.body;
        const [userRegistered] = await usersModel.findUser('email', email);
        console.log('dari userregistered', userRegistered)
        if (!userRegistered) {
            return next(createError(403, 'Email/Password Wrong'))
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
            const { id, username, email, phone, picture } = userRegistered;
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

// create controller for detail user
const detailUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const [resultUser] = await usersModel.detailUser(idUser);
        const [resultWallet] = await walletsModel.seeWallet(idUser);
        resultUser.id_wallet = resultWallet.id
        resultUser.balance = resultWallet.balance
        if (resultUser === undefined) {
            res.json({
                message: 'Data not found'
            });
        } else {
            handleResponse.response(res, resultUser, 200, 'Successfully Fetched');
        }
    } catch (error) {

    }
}

// create controller for read all user 
const getAllUser = async (req, res, next) => {
    try {
        const resultUsers = await usersModel.getAllUser();
        handleResponse.response(res, resultUsers, 200, 'Succsessfully Fetched');
    } catch (error) {

    }
}
// create controller for edit user
const editUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const {username, email, password, phone, picture} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const dataUser = {
            username,
            email,
            password: passwordHash,
            phone,
            picture
        };
        await usersModel.editUser(dataUser, idUser);
        handleResponse.response(res, dataUser, 200, 'Successfully Edited')
    } catch (error) {
        next(createError(500, new createError.InternalServerError()));
    }
}
// export modules to routes
module.exports = {
    addUser,
    loginUser,
    detailUser,
    getAllUser,
    editUser
}