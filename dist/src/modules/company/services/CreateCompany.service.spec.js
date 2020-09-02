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
const FakeCompanyRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeCompanyRepository"));
const CreateCompanyService_1 = __importDefault(require("./CreateCompanyService"));
let fakeCompanyRepository;
let createCompanyService;
describe('CreateCompany', () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        createCompanyService = new CreateCompanyService_1.default(fakeCompanyRepository);
    });
    it('should be able to create a new company', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield createCompanyService.execute({
            name: 'Empresa 1',
            cnpj: '1234567890',
        });
        expect(company).toHaveProperty('id');
    }));
    it('should not be able to create a new company with an already registered cnpj', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createCompanyService.execute({
            name: 'Empresa 1',
            cnpj: '1234567890',
        });
        yield expect(createCompanyService.execute({
            name: 'Empresa 2',
            cnpj: '1234567890',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
