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
const FakeCompanyRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeCompanyRepository"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeContainerRepository_1 = __importDefault(require("../repositories/fakes/FakeContainerRepository"));
const CreateContainerService_1 = __importDefault(require("./CreateContainerService"));
const Container_1 = require("../infra/typeorm/entities/Container");
const ListAllCompanyContainersService_1 = __importDefault(require("./ListAllCompanyContainersService"));
let fakeContainerRepository;
let fakeCompanyRepository;
let createContainerService;
let listContainers;
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
describe('ListAllCompanyContainers Service', () => {
    beforeEach(() => {
        fakeContainerRepository = new FakeContainerRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        listContainers = new ListAllCompanyContainersService_1.default(fakeContainerRepository, fakeCompanyRepository);
        createContainerService = new CreateContainerService_1.default(fakeContainerRepository, fakeCompanyRepository);
    });
    test('Should be able list a containers that belong to a company', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequest());
        const container = yield createContainerService.execute(makeFakeRequestContainer(company.id));
        yield createContainerService.execute(makeFakeRequestContainer(company.id));
        const containers = yield listContainers.execute(container.company_id);
        expect(containers).toHaveLength(2);
    }));
    test('Should not be able list containers if invalid company id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(listContainers.execute(0)).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
