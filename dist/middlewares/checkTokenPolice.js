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
const JwtService_1 = __importDefault(require("../services/JwtService"));
function default_1() {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers.authorization;
            let token;
            if (authorization === null || authorization === void 0 ? void 0 : authorization.includes("Bearer")) {
                token = authorization.split(" ")[1];
            }
            else {
                token = authorization;
            }
            if (!token) {
                res.status(401).send({ message: "вы не авторизованы" });
                return;
            }
            try {
                const decodedData = yield JwtService_1.default.verifyAccess(token);
                const user = decodedData;
                if (user) {
                    return next();
                }
                res.status(403).send({
                    message: `You are not authorized`,
                });
            }
            catch (error) {
                res.status(401).send({ message: "Unathorized", friendlyMg: error });
            }
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=checkTokenPolice.js.map