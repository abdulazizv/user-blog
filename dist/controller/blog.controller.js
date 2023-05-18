"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getblogBId = exports.createBlog = exports.getAllBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const Users_1 = __importDefault(require("../models/Users"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
function getAllBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = +req.body.page || 1;
            const itemsPerPage = 20;
            const user = yield Blog_1.default.find()
                .populate("authorId")
                .skip((page - 1) * itemsPerPage)
                .limit(itemsPerPage);
            const totalCount = yield Users_1.default.countDocuments().exec();
            res.status(200).json({
                records: user,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / itemsPerPage),
                    totalCount,
                },
            });
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Internal server error" });
        }
    });
}
exports.getAllBlog = getAllBlog;
function createBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let image = req.file.filename;
            const blog = yield Blog_1.default.create(Object.assign(Object.assign({}, req.body), { image: image }));
            res.status(201).send(blog);
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Internal server error" });
        }
    });
}
exports.createBlog = createBlog;
function getblogBId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const blog = yield Blog_1.default.findById(id).populate("authorId");
            if (!blog) {
                ApiError_1.default.notFound(res, { message: "NotFound blog with id" });
            }
            res.status(200).send(blog);
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Internal server error" });
        }
    });
}
exports.getblogBId = getblogBId;
function updateBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const blog = yield Blog_1.default.findByIdAndUpdate(id, req.body, {
                new: true
            });
            if (!blog) {
                ApiError_1.default.notFound(res, { message: "Error has been detected during change information" });
            }
            ;
            res.status(200).send(blog);
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Error! Server Error" });
        }
    });
}
exports.updateBlog = updateBlog;
function deleteBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deleted_at = yield Blog_1.default.findByIdAndDelete(id);
            if (!deleted_at) {
                ApiError_1.default.notFound(res, { message: "Error have been detected! ID is not found" });
            }
            res.status(200).json(deleted_at);
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Internal server Error" });
        }
    });
}
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=blog.controller.js.map