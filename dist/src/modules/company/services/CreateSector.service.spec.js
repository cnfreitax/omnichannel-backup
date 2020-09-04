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
const FakeSectorRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeSectorRepository"));
const CreateSectorService_1 = __importDefault(require("./CreateSectorService"));
let fakeCompanyRepository;
let fakeSectorRepository;
let createSectorService;
describe('CreateCompany', () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        fakeSectorRepository = new FakeSectorRepository_1.default();
        createSectorService = new CreateSectorService_1.default(fakeCompanyRepository, fakeSectorRepository);
    });
    it('should be able to create a new sector', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            name: 'Empresa 1',
            cnpj: '1234567890',
        });
        const sector = yield createSectorService.execute({
            company_id: company.id,
            label: 'Vendas',
            phone: '999000999',
        });
        expect(sector).toHaveProperty('id');
    }));
    it('should not be able to create a sector for a non existing company', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createSectorService.execute({
            company_id: 9999,
            label: 'Vendas',
            phone: '999000999',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
