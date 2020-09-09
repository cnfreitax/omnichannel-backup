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
const ListAllCompaniesService_1 = __importDefault(require("./ListAllCompaniesService"));
let fakeCompanyRepository;
let listAllCompaniesService;
const makeFakeRequestCompany = () => ({
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
describe('ListAllCompanies', () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        listAllCompaniesService = new ListAllCompaniesService_1.default(fakeCompanyRepository);
    });
    it('should be able to list all companies', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeCompanyRepository.create(makeFakeRequestCompany());
        const allCompanies = yield listAllCompaniesService.execute();
        expect(allCompanies).toHaveLength(1);
    }));
});
