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
const FakeChatbotRepository_1 = __importDefault(require("@modules/chatbot/repositories/fakes/FakeChatbotRepository"));
const FakeCompanyRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeCompanyRepository"));
const CreateGreetingMessage_service_1 = __importDefault(require("@modules/chatbot/services/CreateGreetingMessage.service"));
const Message_1 = require("@modules/chatbot/infra/typeorm/entities/Message");
let fakeChatbotRepository;
let fakeCompanyRepository;
let createGreetingMessage;
describe('CreateGreetings', () => {
    beforeEach(() => {
        fakeChatbotRepository = new FakeChatbotRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createGreetingMessage = new CreateGreetingMessage_service_1.default(fakeChatbotRepository, fakeCompanyRepository);
    });
    it('shoud br able to create a greeting', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            email: 'jd@test.com',
            name: 'John Doe',
            password: '123123',
        });
        const greetingMessage = yield createGreetingMessage.execute({
            company_id: String(company.id),
            text: 'seja bem vindo!!',
            type: Message_1.MessageType.GREETING,
        });
        expect(greetingMessage).toHaveProperty('id');
    }));
    it('shoud not be able to create greeting with a non existing company', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createGreetingMessage.execute({ company_id: 'non-existing-company', text: 'seja bem vindo!!', type: Message_1.MessageType.GREETING })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('shoud not be able to create two greetings with same company', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            email: 'jd@test.com',
            name: 'John Doe',
            password: '123123',
        });
        yield createGreetingMessage.execute({
            company_id: String(company.id),
            text: 'seja bem vindo!!',
            type: Message_1.MessageType.GREETING,
        });
        yield expect(createGreetingMessage.execute({ company_id: String(company.id), text: 'seja bem vindo!!', type: Message_1.MessageType.GREETING })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('shoud not be able to create a greeting with a different type', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            email: 'jd@test.com',
            name: 'John Doe',
            password: '123123',
        });
        yield expect(createGreetingMessage.execute({ company_id: String(company.id), text: 'seja bem vindo!!', type: Message_1.MessageType.SUBMENU })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
