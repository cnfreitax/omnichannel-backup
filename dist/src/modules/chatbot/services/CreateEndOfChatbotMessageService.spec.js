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
const CreateEndOfChatbotMessageService_1 = __importDefault(require("./CreateEndOfChatbotMessageService"));
const Container_1 = require("../infra/typeorm/entities/Container");
let fakeContainerRepository;
let fakeCompanyRepository;
let createEndOfChatbot;
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
describe('CreateEndOfChatbotMessage', () => {
    beforeEach(() => {
        fakeContainerRepository = new FakeContainerRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createEndOfChatbot = new CreateEndOfChatbotMessageService_1.default(fakeContainerRepository, fakeCompanyRepository);
    });
    it('should be able to create a end of chatbot message', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const message = yield createEndOfChatbot.execute({
            company_id: company.id,
            description: 'Obrigado pelo seu contato',
            type: Container_1.ContainerType.END_CHATBOT,
        });
        expect(message).toHaveProperty('id');
        expect(message.type).toEqual(Container_1.ContainerType.END_CHATBOT);
    }));
    it('should not be able to create a costumer survey with wrong message type', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        yield expect(createEndOfChatbot.execute({
            company_id: company.id,
            description: 'Obrigado pelo seu contato',
            type: Container_1.ContainerType.GREETING,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create a end of chatbot message with a non existing company-id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createEndOfChatbot.execute({
            company_id: 9,
            description: 'Obrigado pelo seu contato',
            type: Container_1.ContainerType.END_CHATBOT,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create a end of chatbot message if company already has one', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const parentMessage = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'Precisa de mais alguma coisa?',
            type: Container_1.ContainerType.MENU,
        });
        yield createEndOfChatbot.execute({
            company_id: company.id,
            from: parentMessage.id,
            description: 'Obrigado pelo seu contato',
            type: Container_1.ContainerType.END_CHATBOT,
        });
        yield expect(createEndOfChatbot.execute({
            company_id: company.id,
            from: parentMessage.id,
            description: 'Obrigado pelo seu contato',
            type: Container_1.ContainerType.END_CHATBOT,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
