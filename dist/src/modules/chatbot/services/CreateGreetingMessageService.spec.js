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
const FakeContainerRepository_1 = __importDefault(require("@modules/chatbot/repositories/fakes/FakeContainerRepository"));
const FakeCompanyRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeCompanyRepository"));
const CreateGreetingMessageService_1 = __importDefault(require("@modules/chatbot/services/CreateGreetingMessageService"));
const Container_1 = require("@modules/chatbot/infra/typeorm/entities/Container");
let fakeContainerRepository;
let fakeCompanyRepository;
let createGreetingMessage;
const makeFakeRequest = () => ({
    name: 'Empresa 1',
    email: 'any_email',
    cnpj: '1234567890',
    address: 'any_address',
    activity: 'any_activity',
    ddd: 'any_ddd',
    website: 'any_web',
    webhook_response: 'any_hook',
    webhook_status: 'any_hook',
});
describe('CreateGreetings', () => {
    beforeEach(() => {
        fakeContainerRepository = new FakeContainerRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createGreetingMessage = new CreateGreetingMessageService_1.default(fakeContainerRepository, fakeCompanyRepository);
    });
    it('should be able to create a greeting', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const greetingMessage = yield createGreetingMessage.execute({
            company_id: company.id,
            description: 'seja bem vindo!!',
            type: Container_1.ContainerType.GREETING,
        });
        expect(greetingMessage).toHaveProperty('id');
    }));
    it('should not be able to create greeting with a non existing company', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createGreetingMessage.execute({ company_id: 9, description: 'seja bem vindo!!', type: Container_1.ContainerType.GREETING })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create two greetings with same company', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        yield createGreetingMessage.execute({
            company_id: company.id,
            description: 'seja bem vindo!!',
            type: Container_1.ContainerType.GREETING,
        });
        yield expect(createGreetingMessage.execute({ company_id: company.id, description: 'seja bem vindo!!', type: Container_1.ContainerType.GREETING })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('shoud not be able to create a greeting with a different type', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        yield expect(createGreetingMessage.execute({ company_id: company.id, description: 'seja bem vindo!!', type: Container_1.ContainerType.MENU })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
