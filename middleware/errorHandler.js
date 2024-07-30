const {constants} = require("../constants.js");

const logError = (err) => {
    console.error(err);
};
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || constants.INTERNAL_SERVER_ERROR;
    res.status(statusCode);
    logError(err);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
            break;

        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
            break;

        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: "An unexpected error occurred",
                stackTrace: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
            break;

        default:
            console.error("No Error ,All good!");
            break;
    }
};

module.exports = errorHandler;