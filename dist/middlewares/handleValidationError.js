"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_validator_1 = require("express-validator");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
function handleValidationErrors(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req).array();
    if (errors.length > 0) {
        return ApiError_1.default.validationError(res, { message: "Error has been detected", friendlyMsg: errors[0] });
    }
    next();
}
module.exports = handleValidationErrors;
//# sourceMappingURL=handleValidationError.js.map