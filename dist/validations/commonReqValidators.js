"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsIDValidation = exports.queryPageValidation = void 0;
const express_validator_1 = require("express-validator");
const queryPageValidation = (0, express_validator_1.checkSchema)({
    page: {
        in: "query",
        isNumeric: true,
        errorMessage: "Page query must be a number",
    },
});
exports.queryPageValidation = queryPageValidation;
const paramsIDValidation = (0, express_validator_1.checkSchema)({
    id: {
        in: "params",
        isMongoId: true,
        errorMessage: "Invalid ID",
    },
});
exports.paramsIDValidation = paramsIDValidation;
//# sourceMappingURL=commonReqValidators.js.map