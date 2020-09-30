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
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const axios_1 = __importDefault(require("axios"));
class LoginApi {
    login({ login, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginData = () => ({
                login,
                password,
            });
            try {
                const resp = yield axios_1.default.post(process.env.LOGIN_API || 'default', loginData());
                const responseData = {
                    token: resp.data.token,
                    validade: resp.data.validade,
                };
                return responseData;
            }
            catch (err) {
                throw new AppError_1.default('Server Error');
            }
        });
    }
}
exports.default = LoginApi;