const createError = require('http-errors');
const handleResponse = require('../helpers/common');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import modules from models
const usersModel = require('../models/users_model');
const walletsModel = require('../models/wallets_model');

// create controller for register user
const addUser = async (req, res, next) => {
    try {
        const randomId = Math.floor(Math.random() * 999);
        const randomIdWallet = 'W-' + Math.floor(Math.random() * 999);
        const { username, email, password } = req.body;
        const defaultPic = 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg';
        const emailRegistered = await usersModel.findUser('email', email);
        if (username === undefined || email === undefined || password === undefined || username === '' || email === '' || password === '') {
            return next(createError(403, 'registration failed, please check the input'));
        } else if (emailRegistered.length > 0) {
            return next(createError(403, 'email already registered'));
        } else {
            const passwordHash = await bcrypt.hash(password, 10);
            const dataUSer = {
                id: randomId,
                username: username,
                email: email,
                password: passwordHash,
                picture: defaultPic
            };
            await usersModel.addUser(dataUSer);
            await walletsModel.addWallet(randomIdWallet, dataUSer.id);
            const resultUser = {
                id_user: dataUSer.id,
                id_wallet: randomIdWallet,
                username: dataUSer.username,
                email: dataUSer.email
            }
            handleResponse.response(res, resultUser, 201, 'user successfully registered');
        }
    } catch (error) {
        next(createError(500, new createError.InternalServerError()));
    }
}
// create controller for login user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [userRegistered] = await usersModel.findUser('email', email);
        if (email === undefined || password === undefined || email === '' || password === '') {
            return next(createError(403, 'login failed, please check the input'));
        } else if (!userRegistered) {
            return next(createError(403, 'email/password wrong'))
        } else {
            const resultHash = await bcrypt.compare(password, userRegistered.password)
            if (!resultHash) return next(createError(403, 'email/password wrong'));
            const secretKey = process.env.SECRET_KEY_JWT;
            const payload = {
                id: userRegistered.id,
                username: userRegistered.username,
                email: userRegistered.email,
                phone: userRegistered.phone,
                role: userRegistered.role,
                verified: userRegistered.verified,
                picture: userRegistered.picture
            };
            const verifyOptions = {
                expiresIn: '1 days'
            };
            const token = jwt.sign(payload, secretKey, verifyOptions);
            const { id, username, email, phone, role, verified, picture } = userRegistered;
            const result = {
                id,
                username,
                email,
                phone,
                role,
                verified,
                picture,
                token: token
            };
            handleResponse.response(res, result, 200, 'successfully login');
        }
    } catch (error) {
        next(createError(500, new createError.InternalServerError()));
    }
}

// create controller for detail user
const detailUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const [resultUser] = await usersModel.detailUser(idUser);
        const [resultWallet] = await walletsModel.seeWallet(idUser);
        if (resultUser === undefined) {
            handleResponse.response(res, null, 404, `user not registered with id: ${idUser}`);
        } else {
            resultUser.id_wallet = resultWallet.id
            resultUser.balance = resultWallet.balance
            handleResponse.response(res, resultUser, 200, 'successfully fetched from server');
        }
    } catch (error) {
        next(createError(500, new createError.InternalServerError()));
    }
}

// create controller for read all user 
const getAllUser = async (req, res, next) => {
    try {
        const searchQuery = req.query.name || '%%';
        const sortQuery = req.query.sort || 'username';
        const orderQuery = req.query.order || 'asc';
        const pageQuery = parseInt(req.query.page) || 1;
        const limitQuery = parseInt(req.query.limit) || 5;
        const offsetQuery = (pageQuery - 1) * limitQuery;


        const resultUsers = await usersModel.getAllUser({
            searchQuery,
            sortQuery,
            orderQuery,
            offsetQuery,
            limitQuery
        });
        handleResponse.response(res, resultUsers, 200, 'successfully fetched from server');
    } catch (error) {

    }
}
// create controller for edit user
const editUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const { username, email, password, phone, picture } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const [userRegistered] = await usersModel.findUser('id', idUser);
        if (userRegistered === undefined) {
            handleResponse.response(res, null, 404, `user not registered with id: ${idUser}`);
        } else if (username === undefined || email === undefined || password === undefined || phone === undefined || picture === undefined || username === '' || email === '' || password === '' || phone === '' || picture === '') {
            return next(createError(403, 'edit failed, please check the input'));
        } else {
            const dataUser = {
                username,
                email,
                password: passwordHash,
                phone,
                picture
            };
            await usersModel.editUser(dataUser, idUser);
            handleResponse.response(res, dataUser, 200, 'successfully edited');
        }
    } catch (error) {
        next(createError(500, new createError.InternalServerError()));
    }
}
// create controller for edit password user
const editPassUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const { oldPassword } = req.body;
        const { newPassword } = req.body;

        const [userRegistered] = await usersModel.findUser('id', idUser);
        if (oldPassword === undefined || newPassword === undefined || oldPassword === '' || newPassword === '') {
            return next(createError(403, 'login failed, please check the input'));
        } else if (userRegistered === undefined) {
            handleResponse.response(res, null, 404, `user not registered with id: ${idUser}`);
        } else {
            const resultHash = await bcrypt.compare(oldPassword, userRegistered.password);
            if (!resultHash) return next(createError(403, 'old password not match'))
            const passwordHash = await bcrypt.hash(newPassword, 10);
            const dataPassword = {
                password: passwordHash
            }
            await usersModel.editUser(dataPassword, idUser);
            handleResponse.response(res, true, 200, 'successfully password changed');
        } 
    } catch (error) {
        console.log(error)
        next(createError(500, new createError.InternalServerError()));
    }
}
// create controller for edit pic user
const editPicUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        // const {picture} = req.body;
        const fileName = req.file.filename;

        const [userRegistered] = await usersModel.findUser('id', idUser);
        if (userRegistered === undefined) {
            handleResponse.response(res, null, 404, `user not registered with id: ${idUser}`);
        } else {
            const dataPic = {
                picture: `${process.env.BASE_URL}/file/${fileName}`
            }
            await usersModel.editUser(dataPic, idUser);
            handleResponse.response(res, dataPic, 200, 'picture successfully edited');
        }
    } catch (error) {
        console.log(error)
        next(createError(500, new createError.InternalServerError()));
    }
}
// create controller for edit phone user
const editPhoneUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const { phone } = req.body;

        const [userRegistered] = await usersModel.findUser('id', idUser);
        if (userRegistered === undefined) {
            handleResponse.response(res, null, 404, `user not registered with id: ${idUser}`);
        } else {
            const dataPhone = {
                phone
            }
            await usersModel.editUser(dataPhone, idUser);
            handleResponse.response(res, dataPhone, 200, 'phone sucessfully edited');
        }
    } catch (error) {
        console.log(error)
        next(createError(500, new createError.InternalServerError()));
    }
}
//create controller for delete user
const deleteUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const resultUser = await usersModel.findUser('id', idUser);
        if (resultUser.length === 0) {
            return next(createError(403, `id ${idUser} not found`));
        } else {
            await usersModel.deleteUser(idUser);
            handleResponse.response(res, true, 200, `successfully deleted id: ${idUser}`)
        }
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
    editUser,
    editPicUser,
    editPhoneUser,
    editPassUser,
    deleteUser
}