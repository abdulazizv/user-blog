"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const fs_1 = require("fs");
const diskStorage = multer_1.default.diskStorage({
    destination: (req, file, done) => {
        if (!file)
            return done(new Error("Upload file error"), "");
        const isFolderExists = (0, fs_1.existsSync)((0, path_1.resolve)(process.cwd(), "public/images"));
        if (!isFolderExists) {
            (0, fs_1.mkdirSync)((0, path_1.resolve)(process.cwd(), "public/images"), {
                recursive: true,
            });
        }
        const fileName = `${Date.now()}-${file.originalname}`;
        const fileExists = (0, fs_1.existsSync)((0, path_1.resolve)(process.cwd(), `public/images/${fileName}`));
        if (!fileExists)
            return done(null, (0, path_1.resolve)(process.cwd(), "public/images"));
        (0, fs_1.unlink)((0, path_1.resolve)(process.cwd(), `public/images/${fileName}`), (error) => {
            if (error)
                return done(error, "");
            return done(null, (0, path_1.resolve)(process.cwd(), "public/images"));
        });
    },
    filename: (req, file, done) => {
        if (file) {
            const fileName = `${Date.now()}-${file.originalname}`;
            const extFile = file.originalname.replace(".", "");
            const extPattern = /(jpg|jpeg|png|gif|svg)/gi.test(extFile);
            if (!extPattern)
                return done(new TypeError("File format is not valid"), "");
            return done(null, fileName);
        }
    },
});
const fileUpload = (0, multer_1.default)({ storage: diskStorage, limits: { fileSize: 1000000 } });
exports.fileUpload = fileUpload;
//# sourceMappingURL=FileService.js.map