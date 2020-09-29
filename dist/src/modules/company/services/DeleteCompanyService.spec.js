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
const FakeCompanyRepository_1 = __importDefault(require("../repositories/fakes/FakeCompanyRepository"));
const CreateCompanyService_1 = __importDefault(require("./CreateCompanyService"));
const DeleteCompanyService_1 = __importDefault(require("./DeleteCompanyService"));
let fakeCompanyRepository;
let createCompanyService;
let deleteCompanyService;
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
describe('DeleteCompany Service', () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createCompanyService = new CreateCompanyService_1.default(fakeCompanyRepository);
        deleteCompanyService = new DeleteCompanyService_1.default(fakeCompanyRepository);
    });
    test('Should delete company is user have permission', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield createCompanyService.execute(makeFakeRequest());
        const companyDelete = yield deleteCompanyService.execute(company.id);
        expect(companyDelete).toBeTruthy();
    }));
    test('Should returns throws if company not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(deleteCompanyService.execute(1)).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
