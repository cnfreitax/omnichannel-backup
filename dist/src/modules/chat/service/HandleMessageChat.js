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
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const tsyringe_1 = require("tsyringe");
let HandleMessageChat = class HandleMessageChat {
    constructor(availableRepository, sendMessage, authApi, loginApi, chatlineRepository, companyRepository, customerRepository, token) {
        this.availableRepository = availableRepository;
        this.sendMessage = sendMessage;
        this.authApi = authApi;
        this.loginApi = loginApi;
        this.chatlineRepository = chatlineRepository;
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.token = token;
    }
    execute({ message, attendantId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendant = yield this.availableRepository.findById(attendantId);
            if (!attendant) {
                throw new AppError_1.default('Attendant not found');
            }
            const tokenValidate = yield this.authApi.checkTokenValidate();
            if (!tokenValidate) {
                const newToken = yield this.loginApi.login({ login: String(process.env.API_USERNAME), password: String(process.env.API_PASSWORD) });
                this.token = newToken.token;
            }
            else {
                const validToken = yield this.authApi.findToken();
                if (!validToken) {
                    throw new AppError_1.default('Token not found');
                }
                this.token = validToken.token;
            }
            const chatDatails = yield this.chatlineRepository.findByAttendant(attendant.id);
            if (!chatDatails) {
                throw new AppError_1.default('Not found');
            }
            const company = yield this.companyRepository.findById(chatDatails.company_id);
            if (!company) {
                throw new AppError_1.default('Company not found');
            }
            const customer = yield this.customerRepository.findById(chatDatails.customer_id);
            if (!customer) {
                throw new AppError_1.default('Not found');
            }
            yield this.sendMessage.send([
                {
                    token: this.token,
                    Telephone: customer.phone,
                    codCampaign: company.codCampaign,
                    Message: message,
                },
            ]);
        });
    }
};
HandleMessageChat = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('AvailableUser')),
    __param(1, tsyringe_1.inject('SendMessage')),
    __param(2, tsyringe_1.inject('AuthCodeApi')),
    __param(3, tsyringe_1.inject('LoginAPI')),
    __param(4, tsyringe_1.inject('ChatlineRepository')),
    __param(5, tsyringe_1.inject('CompaniesRepository')),
    __param(6, tsyringe_1.inject('CustomerRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, String])
], HandleMessageChat);
exports.default = HandleMessageChat;
