"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const auth_1 = __importDefault(require("@config/auth"));
let AuthUserService = class AuthUserService {
    constructor(userRepository, hashProvider, availableUser) {
        this.userRepository = userRepository;
        this.hashProvider = hashProvider;
        this.availableUser = availableUser;
    }
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new AppError_1.default('incorrect email/password', 401);
            }
            const matchPasswordProvided = yield this.hashProvider.compareHash(password, user.password);
            if (!matchPasswordProvided) {
                throw new AppError_1.default('incorrect email/password', 401);
            }
            if (user.access_level === 'common') {
                if (!user.company_id) {
                    throw new AppError_1.default('User needs to register with a company to login');
                }
                yield this.availableUser.create({
                    company_id: user.company_id,
                    user_id: user.id,
                });
            }
            const { expiresIn, secret } = auth_1.default.jwt;
            const token = jsonwebtoken_1.sign({
                access_level: user.access_level,
            }, secret, {
                subject: `${user.id}`,
                expiresIn,
            });
            return { user, token };
        });
    }
};
AuthUserService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UserRepository')),
    __param(1, tsyringe_1.inject('HashProvider')),
    __param(2, tsyringe_1.inject('AvailableUser')),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthUserService);
exports.default = AuthUserService;