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
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const CreateCompanyService_1 = __importDefault(require("./CreateCompanyService"));
const UpdateCompanyService_1 = __importDefault(require("./UpdateCompanyService"));
const FakeCompanyRepository_1 = __importDefault(require("../repositories/fakes/FakeCompanyRepository"));
let fakeCompanyRepository;
let createCompanyService;
let updateCompanyService;
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
describe('UpdateCompany Service', () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createCompanyService = new CreateCompanyService_1.default(fakeCompanyRepository);
        updateCompanyService = new UpdateCompanyService_1.default(fakeCompanyRepository);
    });
    test('Should update company profile if all correct values if provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield createCompanyService.execute(makeFakeRequest());
        yield updateCompanyService.execute({
            id: company.id,
            name: 'New Name',
            email: 'new@mail.com',
            address: 'any_address',
            activity: 'new_activity',
            ddd: 'new_ddd',
            website: 'new_web',
        });
        expect(company.email).toEqual('new@mail.com');
    }));
    test('Should returns throws if company not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(updateCompanyService.execute({
            id: 0,
            name: 'New Name',
            email: 'another@mail.com',
            address: 'any_address',
            activity: 'new_activity',
            ddd: 'new_ddd',
            website: 'new_web',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    test('Should return throws if email updated alredy in used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createCompanyService.execute({
            name: 'Empresa 2',
            email: 'another@mail.com',
            cnpj: '123467890',
            address: 'any_address',
            activity: 'any_activity',
            ddd: 'any_ddd',
            website: 'any_web',
            webhook_response: 'any_hook',
            webhook_status: 'any_hook',
        });
        const company = yield createCompanyService.execute(makeFakeRequest());
        yield expect(updateCompanyService.execute({
            id: company.id,
            name: 'New Name',
            email: 'another@mail.com',
            address: 'any_address',
            activity: 'new_activity',
            ddd: 'new_ddd',
            website: 'new_web',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
