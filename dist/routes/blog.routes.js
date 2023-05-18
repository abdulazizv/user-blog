"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const router = (0, express_1.Router)();
const blog_controller_1 = require("../controller/blog.controller");
const blog_1 = require("../validations/blog");
const commonReqValidators_1 = require("../validations/commonReqValidators");
const FileService_1 = require("../services/FileService");
const checkTokenPolice_1 = __importDefault(require("../middlewares/checkTokenPolice"));
router.get("/", (0, checkTokenPolice_1.default)(), blog_controller_1.getAllBlog);
router.post("/", (0, checkTokenPolice_1.default)(), FileService_1.fileUpload.single("image"), [blog_1.blogCreateValidation], blog_controller_1.createBlog);
router.get("/:id", (0, checkTokenPolice_1.default)(), blog_controller_1.getblogBId);
router.put("/:id", (0, checkTokenPolice_1.default)(), [blog_1.blogUpdateValidation, commonReqValidators_1.paramsIDValidation], blog_controller_1.updateBlog);
router.delete("/:id", (0, checkTokenPolice_1.default)(), commonReqValidators_1.paramsIDValidation, blog_controller_1.deleteBlog);
module.exports = router;
//# sourceMappingURL=blog.routes.js.map