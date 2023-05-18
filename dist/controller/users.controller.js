"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateUser = exports.deleteUser = exports.getUserByID = exports.signin = exports.register = exports.getAll = void 0;
const JwtService_1 = __importDefault(require("../services/JwtService"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const bcrypt = __importStar(require("bcryptjs"));
const Users_1 = __importDefault(require("../models/Users"));
const config_1 = __importDefault(require("config"));
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page } = req.body || 1;
            const itemsPerPage = 20;
            const users = yield Users_1.default.find()
                .skip((page - 1) * itemsPerPage)
                .limit(itemsPerPage);
            const totalCount = yield Users_1.default.countDocuments().exec();
            res.status(200).json({
                records: users,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / itemsPerPage),
                    totalCount,
                },
            });
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Server error" });
        }
    });
}
exports.getAll = getAll;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, password, email } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 7);
            const user = yield Users_1.default.create({
                name: name,
                password: hashedPassword,
                email: email,
            });
            const payload = {
                id: user._id,
                email: email,
            };
            const tokens = JwtService_1.default.generateTokens(payload);
            const hashed_token = bcrypt.hashSync(tokens.refreshToken, 7);
            user.token = hashed_token;
            yield user.save();
            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: config_1.default.get("refresh_token_ms"),
                httpOnly: true,
            });
            res.status(200).json({ token: tokens.accessToken, staff: payload });
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Server Error" });
        }
    });
}
exports.register = register;
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield Users_1.default.findOne({ email });
            if (!user) {
                return ApiError_1.default.badRequest(res, { message: "You are not an active" });
            }
            let comparePassword;
            if (user.password !== undefined) {
                comparePassword = bcrypt.compareSync(password, user.password);
            }
            if (!comparePassword) {
                return ApiError_1.default.badRequest(res, {
                    message: "Login or password wrong",
                });
            }
            const payload = {
                id: user._id,
                role: user.email,
            };
            const tokens = JwtService_1.default.generateTokens(payload);
            const hashed_token = bcrypt.hashSync(tokens.refreshToken, 7);
            user.token = hashed_token;
            yield user.save();
            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: config_1.default.get("refresh_token_ms"),
                httpOnly: true,
            });
            res.status(200).send({ token: tokens.accessToken, staff: payload });
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Server Error" });
        }
    });
}
exports.signin = signin;
function getUserByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Users_1.default.findById(req.params.id);
            if (!user) {
                return ApiError_1.default.notFound(res, { message: "NOT found user" });
            }
            res.status(200).send(user);
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Internal Server error" });
        }
    });
}
exports.getUserByID = getUserByID;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isDelete = yield Users_1.default.findByIdAndDelete(req.params.id);
            if (!isDelete) {
                ApiError_1.default.notFound(res, { message: "NOT found with ID" });
            }
            res.status(200).send({
                message: "Successfully deleted",
                userId: isDelete === null || isDelete === void 0 ? void 0 : isDelete._id,
            });
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Internal server error" });
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Users_1.default.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (!user) {
                return ApiError_1.default.notFound(res, { message: "NOT Found with ID" });
            }
            res.status(200).send(user);
        }
        catch (error) {
            ApiError_1.default.internal(res, { message: "Internal server error" });
        }
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=users.controller.js.map