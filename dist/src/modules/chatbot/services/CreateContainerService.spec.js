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
const CreateContainerService_1 = __importDefault(require("./CreateContainerService"));
const Container_1 = require("../infra/typeorm/entities/Container");
let fakeContainerRepository;
let fakeCompanyRepository;
let createContainerService;
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
const makeFakeRequestContainer = (companyId) => ({
    company_id: companyId,
    description: 'any_description',
    type: Container_1.ContainerType.MENU,
});
describe('CreateContainerService', () => {
    beforeEach(() => {
        fakeContainerRepository = new FakeContainerRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createContainerService = new CreateContainerService_1.default(fakeContainerRepository, fakeCompanyRepository);
    });
    test('should be able to create a new container', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const container = yield createContainerService.execute(makeFakeRequestContainer(company.id));
        expect(container).toHaveProperty('id');
        expect(container.type).toEqual(Container_1.ContainerType.MENU);
    }));
    test('should not be able to create a new container for a non existing company', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createContainerService.execute({
            company_id: 9,
            description: 'O que voce quer?',
            type: Container_1.ContainerType.MENU,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    test('should be able to create a new container with a parent container', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const parentContainer = yield createContainerService.execute({
            company_id: company.id,
            description: 'Mensagem Ola',
            type: Container_1.ContainerType.MESSAGE,
        });
        const container = yield createContainerService.execute({
            company_id: company.id,
            from: parentContainer.id,
            description: 'Acabou',
            type: Container_1.ContainerType.END_SERVICE,
        });
        expect(container).toHaveProperty('id');
        expect(container.type).toEqual(Container_1.ContainerType.END_SERVICE);
        expect(container.from).toEqual(parentContainer.id);
    }));
    test('should not be able to create a new container with a non existing parent container', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        yield expect(createContainerService.execute({
            company_id: company.id,
            from: 9,
            description: 'Acabou',
            type: Container_1.ContainerType.END_SERVICE,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create a new container with a invalid container type', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        yield expect(createContainerService.execute({
            company_id: company.id,
            description: 'O que voce quer?',
            type: 'invalid container type',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
