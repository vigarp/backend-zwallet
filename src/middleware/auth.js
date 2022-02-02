const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return next(createError(403, 'error empty token'));
    }
    try {
        const secretKey = process.env.SECRET_KEY_JWT;
        const decoded = jwt.verify(token, secretKey);
        req.email = decoded.email;
        req.role = decoded.role;
        next();
    } catch (err) {
        console.log(err);
        if (err && err.name === 'JsonWebTokenError') {
            return next(createError(400, 'invalid token'));
        } else if (err && err.name === 'TokenExpiredError') {
            return next(createError(400, 'expired token'))
        } else {
            return next(createError(400, 'token not expired'))
        }
    }
}

const isAdmin = (req, res, next) => {
    const role = req.role
    if (role !== 'admin') return next(createError(401, 'admin only'))
    next();
}

module.exports = {
    protect,
    isAdmin
}