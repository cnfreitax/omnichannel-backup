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
const CreateEndOfChatbotMessage_service_1 = __importDefault(require("./CreateEndOfChatbotMessage.service"));
const Message_1 = require("../infra/typeorm/entities/Message");
let fakeChatbotRepository;
let fakeCompanyRepository;
let createEndOfChatbot;
describe('CreateEndOfChatbotMessage', () => {
    beforeEach(() => {
        fakeChatbotRepository = new FakeChatbotRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createEndOfChatbot = new CreateEndOfChatbotMessage_service_1.default(fakeChatbotRepository, fakeCompanyRepository);
    });
    it('should be able to create a end of chatbot message', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            email: 'jd@test.com',
            name: 'John Doe',
            password: '123123',
        });
        const parentMessage = yield fakeChatbotRepository.create({
            company_id: String(company.id),
            text: 'Precisa de mais alguma coisa?',
            type: Message_1.MessageType.SUBMENU,
        });
        const message = yield createEndOfChatbot.execute({
            company_id: String(company.id),
            parent_id: String(parentMessage.id),
            text: 'Obrigado pelo seu contato',
            type: Message_1.MessageType.END_CHATBOT,
        });
        expect(message).toHaveProperty('id');
        expect(message.type).toEqual(Message_1.MessageType.END_CHATBOT);
    }));
    it('should not be able to create a costumer survey with wrong message type', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            email: 'jd@test.com',
            name: 'John Doe',
            password: '123123',
        });
        yield expect(createEndOfChatbot.execute({
            company_id: String(company.id),
            text: 'Obrigado pelo seu contato',
            type: Message_1.MessageType.GREETING,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create a end of chatbot message with a non existing parent-id', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            email: 'jd@test.com',
            name: 'John Doe',
            password: '123123',
        });
        yield expect(createEndOfChatbot.execute({
            company_id: String(company.id),
            parent_id: 'non-existing-parent-id',
            text: 'Obrigado pelo seu contato',
            type: Message_1.MessageType.END_CHATBOT,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create a end of chatbot message with a non existing company-id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createEndOfChatbot.execute({
            company_id: 'non-existing-company-id',
            text: 'Obrigado pelo seu contato',
            type: Message_1.MessageType.END_CHATBOT,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
