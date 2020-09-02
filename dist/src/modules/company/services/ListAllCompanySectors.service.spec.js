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
const FakeSectorRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeSectorRepository"));
const ListAllCompanySectorsService_1 = __importDefault(require("./ListAllCompanySectorsService"));
const FakeCompanyRepository_1 = __importDefault(require("../repositories/fakes/FakeCompanyRepository"));
let fakeCompanyRepository;
let fakeSectorRepository;
let listAllCompanySectorsService;
describe('ListAllCompanies', () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        fakeSectorRepository = new FakeSectorRepository_1.default();
        listAllCompanySectorsService = new ListAllCompanySectorsService_1.default(fakeCompanyRepository, fakeSectorRepository);
    });
    it('should be able to list all company sectors', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create({
            name: 'Empresa 1',
            cnpj: '123456789',
        });
        yield fakeSectorRepository.create({
            company_id: company.id,
            label: 'Vendas',
            phone: '999000999',
        });
        const allSectors = yield listAllCompanySectorsService.execute(company.id);
        expect(allSectors).toHaveLength(1);
    }));
    it('should not be able to list sectors for a non existing company', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(listAllCompanySectorsService.execute(999)).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
