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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
class JwtService {
    constructor(accessKey, refreshKey, accessTime, refreshTime) {
        this.accessKey = accessKey;
        this.refreshKey = refreshKey;
        this.accessTime = accessTime;
        this.refreshTime = refreshTime;
    }
    verifyAccess(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, this.accessKey, {});
        });
    }
    verifyRefresh(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, this.refreshKey, {});
        });
    }
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, this.accessKey, {
            expiresIn: this.accessTime,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, this.refreshKey, {
            expiresIn: this.refreshTime,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
}
exports.default = new JwtService(config_1.default.get("access_key"), config_1.default.get("refresh_key"), config_1.default.get("access_time"), config_1.default.get("refresh_time"));
//# sourceMappingURL=JwtService.js.map