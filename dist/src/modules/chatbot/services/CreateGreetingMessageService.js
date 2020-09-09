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
const tsyringe_1 = require("tsyringe");
const Container_1 = require("@modules/chatbot/infra/typeorm/entities/Container");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
let CreateGreetingMessage = class CreateGreetingMessage {
    constructor(containerRepository, companyRepository) {
        this.containerRepository = containerRepository;
        this.companyRepository = companyRepository;
    }
    execute({ description, type, company_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.findById(company_id);
            if (!company) {
                throw new AppError_1.default('Company not found');
            }
            const greetingExists = yield this.containerRepository.findExistingContainer({ company_id, type });
            if (greetingExists) {
                throw new AppError_1.default('This company already has a greeting message');
            }
            if (type !== Container_1.ContainerType.GREETING) {
                throw new AppError_1.default('Wrong message type');
            }
            const greetingContainer = yield this.containerRepository.create({ description, company_id, type });
            return greetingContainer;
        });
    }
};
CreateGreetingMessage = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('ContainerRepository')),
    __param(1, tsyringe_1.inject('CompaniesRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateGreetingMessage);
exports.default = CreateGreetingMessage;
