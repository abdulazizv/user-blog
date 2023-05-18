"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidation = exports.userCreateValidation = void 0;
const express_validator_1 = require("express-validator");
exports.userCreateValidation = (0, express_validator_1.checkSchema)({
    name: {
        isString: {},
        errorMessage: "Name must be a string"
    },
    email: {
        isString: {},
        errorMessage: "Email must be a string"
    },
    password: {
        isString: {},
        errorMessage: "Password must be a string"
    }
});
exports.userUpdateValidation = (0, express_validator_1.checkSchema)({
    name: {
        isString: {},
        optional: {},
        errorMessage: "Name must be a string"
    },
    email: {
        isString: {},
        optional: {},
        errorMessage: "Email must be a string"
    },
    password: {
        isString: {},
        optional: {},
        errorMessage: "Password must be a string"
    }
});
//# sourceMappingURL=users.js.map