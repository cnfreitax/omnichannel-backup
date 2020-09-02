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
const CreateCostumerSurveyService_1 = __importDefault(require("./CreateCostumerSurveyService"));
const Container_1 = require("../infra/typeorm/entities/Container");
let fakeContainerRepository;
let fakeCompanyRepository;
let createCostumerSurvey;
describe('CreateCostumerSurvey', () => {
    beforeEach(() => {
        fakeContainerRepository = new FakeContainerRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createCostumerSurvey = new CreateCostumerSurveyService_1.default(fakeContainerRepository, fakeCompanyRepository);
    });
    it('should be able to create a costumer survey', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            name: 'Company Doe',
            cnpj: '123123',
        });
        const parentMessage = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'Precisa de mais alguma coisa?',
            type: Container_1.ContainerType.MESSAGE,
        });
        const message = yield createCostumerSurvey.execute({
            company_id: company.id,
            from: parentMessage.id,
            description: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
            type: Container_1.ContainerType.SURVEY,
        });
        expect(message).toHaveProperty('id');
        expect(message.type).toEqual(Container_1.ContainerType.SURVEY);
    }));
    it('should not be able to create a costumer survey with wrong message type', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            name: 'Company Doe',
            cnpj: '123123',
        });
        yield expect(createCostumerSurvey.execute({
            company_id: company.id,
            description: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
            type: Container_1.ContainerType.GREETING,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create a costumer survey with a non existing parent-id', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            name: 'Company Doe',
            cnpj: '123123',
        });
        yield expect(createCostumerSurvey.execute({
            company_id: company.id,
            from: 0,
            description: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
            type: Container_1.ContainerType.SURVEY,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create a costumer survey with a non existing company-id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createCostumerSurvey.execute({
            company_id: 0,
            description: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
            type: Container_1.ContainerType.SURVEY,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
