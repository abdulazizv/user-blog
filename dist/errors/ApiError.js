"use strict";
class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
    static badRequest(res, errorMessage) {
        return res.status(400).json({
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg,
        });
    }
    static validationError(res, errorMessage) {
        return res.status(422).json({
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg,
        });
    }
    static unauthorized(res, errorMessage) {
        return res.status(401).json({
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg,
        });
    }
    static forbidden(res, errorMessage) {
        return res.status(403).json({
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg,
        });
    }
    static notFound(res, errorMessage) {
        return res.status(404).json({
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg,
        });
    }
    static internal(res, errorMessage) {
        console.log(errorMessage.message);
        return res.status(500).json({
            friendlyMsg: errorMessage.friendlyMsg,
        });
    }
}
module.exports = ApiError;
//# sourceMappingURL=ApiError.js.map