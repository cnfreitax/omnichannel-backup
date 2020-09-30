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
const UpdateContainerService_1 = __importDefault(require("./UpdateContainerService"));
const Container_1 = require("../infra/typeorm/entities/Container");
let fakeContainerRepository;
let fakeCompanyRepository;
let updateContainerService;
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
describe('CreateContainerService', () => {
    beforeEach(() => {
        fakeContainerRepository = new FakeContainerRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        updateContainerService = new UpdateContainerService_1.default(fakeContainerRepository);
    });
    it('should be able to update a existing container', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const fromContainer = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'Ola',
            type: Container_1.ContainerType.GREETING,
        });
        const container = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'O que voce quer?',
            type: Container_1.ContainerType.MENU,
        });
        const toContainer = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'Obrigado',
            type: Container_1.ContainerType.END_CHATBOT,
        });
        const updatedContainer = yield updateContainerService.execute({
            id: container.id,
            description: 'Ola como vai?',
            from: fromContainer.id,
            to: toContainer.id,
        });
        expect(updatedContainer).toHaveProperty('id');
        expect(updatedContainer.description).toEqual('Ola como vai?');
        expect(updatedContainer.type).toEqual(Container_1.ContainerType.MENU);
    }));
    it('should not be able to update a non existing container', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(updateContainerService.execute({
            id: 9,
            description: 'O que voce quer?',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to update a existing container with a non existing toContainer', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const container = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'O que voce quer?',
            type: Container_1.ContainerType.MENU,
        });
        yield expect(updateContainerService.execute({
            id: container.id,
            description: 'Ola como vai?',
            to: 9,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to update a existing container with a non existing fromContainer', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const container = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'O que voce quer?',
            type: Container_1.ContainerType.MENU,
        });
        yield expect(updateContainerService.execute({
            id: container.id,
            description: 'Ola como vai?',
            from: 9,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should be able to update a existing container with content', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const container = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'O que voce quer?',
            type: Container_1.ContainerType.API,
        });
        const updatedContainer = yield updateContainerService.execute({
            id: container.id,
            description: 'Ola como vai?',
            content: {
                api: {
                    url: 'fsafa',
                    param: 'faasfas',
                },
            },
        });
        expect(updatedContainer).toHaveProperty('id');
        expect(updatedContainer.content).toHaveProperty('api');
        expect(updatedContainer.type).toEqual(Container_1.ContainerType.API);
    }));
    it('should be able to update a existing container with content 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const container = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'O que voce quer?',
            type: Container_1.ContainerType.MEDIA,
        });
        const updatedContainer = yield updateContainerService.execute({
            id: container.id,
            description: 'Ola como vai?',
            content: {
                media: {
                    idMedia: '123',
                    nomeArquivo: 'aaa',
                    validUntil: '2132',
                },
            },
        });
        expect(updatedContainer).toHaveProperty('id');
        expect(updatedContainer.content).toHaveProperty('media');
        expect(updatedContainer.type).toEqual(Container_1.ContainerType.MEDIA);
    }));
    it('should not be able to update a existing container with invalid content type', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const container = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'O que voce quer?',
            type: Container_1.ContainerType.API,
        });
        yield expect(updateContainerService.execute({
            id: container.id,
            description: 'Ola como vai?',
            content: {
                media: {
                    idMedia: '123',
                    nomeArquivo: 'aaa',
                    validUntil: '2132',
                },
            },
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to update a existing container with invalid content type 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const container = yield fakeContainerRepository.create({
            company_id: company.id,
            description: 'O que voce quer?',
            type: Container_1.ContainerType.MEDIA,
        });
        yield expect(updateContainerService.execute({
            id: container.id,
            description: 'Ola como vai?',
            content: {
                api: {
                    url: 'fsafa',
                    param: 'faasfas',
                },
            },
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
