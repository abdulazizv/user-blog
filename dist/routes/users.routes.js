"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const router = (0, express_1.Router)();
const users_controller_1 = require("../controller/users.controller");
const users_1 = require("../validations/users");
const handleValidationError_1 = __importDefault(require("../middlewares/handleValidationError"));
const commonReqValidators_1 = require("../validations/commonReqValidators");
const checkTokenPolice_1 = __importDefault(require("../middlewares/checkTokenPolice"));
router.get("/", (0, checkTokenPolice_1.default)(), users_controller_1.getAll);
router.post("/register", [users_1.userCreateValidation, handleValidationError_1.default], users_controller_1.register);
router.post("/signin", [users_1.userUpdateValidation, handleValidationError_1.default], users_controller_1.signin);
router.get("/:id", (0, checkTokenPolice_1.default)(), [commonReqValidators_1.paramsIDValidation, handleValidationError_1.default], users_controller_1.getUserByID);
router.put("/:id", (0, checkTokenPolice_1.default)(), [commonReqValidators_1.paramsIDValidation, users_1.userUpdateValidation, handleValidationError_1.default], users_controller_1.updateUser);
router.delete("/:id", (0, checkTokenPolice_1.default)(), [commonReqValidators_1.paramsIDValidation, handleValidationError_1.default], users_controller_1.deleteUser);
module.exports = router;
//# sourceMappingURL=users.routes.js.map