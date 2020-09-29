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
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const TokenAccess_1 = __importDefault(require("../entities/TokenAccess"));
class AuthCodeApi {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(TokenAccess_1.default);
    }
    findToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ormRepository.findOne();
            return token;
        });
    }
    updateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.ormRepository.find();
            for (const tokenSelected of tokens) {
                this.ormRepository.delete(tokenSelected);
            }
            yield this.ormRepository.save(token);
        });
    }
    checkTokenValidate() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ormRepository.findOne();
            if (!token) {
                return false;
            }
            const dateNow = new Date();
            const tokenValidadeFormat = Date.parse(token.validade);
            return date_fns_1.isAfter(dateNow, tokenValidadeFormat);
        });
    }
}
exports.default = AuthCodeApi;
