"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateValidation = exports.blogCreateValidation = void 0;
const express_validator_1 = require("express-validator");
exports.blogCreateValidation = (0, express_validator_1.checkSchema)({
    content: {
        isString: {},
        errorMessage: "Content need to be string"
    },
    authorId: {
        isMongoId: {},
        errorMessage: "AuthorID need to be real MongoID"
    }
});
exports.blogUpdateValidation = (0, express_validator_1.checkSchema)({
    content: {
        isString: {},
        optional: {},
        errorMessage: "Content need to be string"
    },
    authorId: {
        isMongoId: {},
        optional: {},
        errorMessage: "Author_id is need to ber real MongoId"
    }
});
//# sourceMappingURL=blog.js.map