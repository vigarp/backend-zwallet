// create handle for not found url/link/path
const urlNotFound = (req, res, next) => {
    res.status(404);
    res.json({
        status: 'Failed',
        code: 404,
        data: null,
        message: 'URL Not Found'
    });
};

// create handle for response for methods
const response = (res, result, status, message, pagination) => {
    if (result === null) {
        res.status(status).json({
            status: 'Failed',
            code: status || 200,
            data: result,
            message: message || null,
            pagination: pagination
        });
    } else {
        res.status(status).json({
            status: 'Success',
            code: status || 200,
            data: result,
            message: message || null,
            pagination: pagination
        });
    }
};

// export modules
module.exports = {
    urlNotFound,
    response
}