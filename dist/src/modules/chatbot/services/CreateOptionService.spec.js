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
require("reflect-metadata");
const CreateCompanyService_1 = __importDefault(require("@modules/company/services/CreateCompanyService"));
const FakeCompanyRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeCompanyRepository"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const CreateOptionService_1 = __importDefault(require("./CreateOptionService"));
const FakeOptionRepository_1 = __importDefault(require("../repositories/fakes/FakeOptionRepository"));
const FakeContainerRepository_1 = __importDefault(require("../repositories/fakes/FakeContainerRepository"));
const CreateContainerService_1 = __importDefault(require("./CreateContainerService"));
const Container_1 = require("../infra/typeorm/entities/Container");
let fakeOptionRepository;
let fakeContainerRepository;
let fakeCompanyRepository;
let createCompany;
let createContainer;
let createOption;
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
const makeOptionRequest = (containerId) => ({
    container_id: containerId,
    description: 'any_description',
});
describe('CreateOption Service', () => {
    beforeEach(() => {
        fakeOptionRepository = new FakeOptionRepository_1.default();
        fakeContainerRepository = new FakeContainerRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createCompany = new CreateCompanyService_1.default(fakeCompanyRepository);
        createContainer = new CreateContainerService_1.default(fakeContainerRepository, fakeCompanyRepository);
        createOption = new CreateOptionService_1.default(fakeOptionRepository, fakeContainerRepository);
    });
    test('Should be able create a Option if correct values is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield createCompany.execute(makeFakeRequest());
        const container = yield createContainer.execute(makeFakeRequestContainer(company.id));
        const option = yield createOption.execute(makeOptionRequest(container.id));
        expect(option).toHaveProperty('id');
    }));
    test('Should not be able create a Option if invalid container_id is provider', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createOption.execute({
            container_id: 0,
            description: 'any_description',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
