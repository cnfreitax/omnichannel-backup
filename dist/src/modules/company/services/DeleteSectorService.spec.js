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
const FakeSectorRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeSectorRepository"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const CreateSectorService_1 = __importDefault(require("./CreateSectorService"));
const DeleteSectorService_1 = __importDefault(require("./DeleteSectorService"));
let fakeCompanyRepository;
let fakeSectorRepository;
let createSectorService;
let deleteSectorService;
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
const makeFakeRequestSector = (companyId) => ({
    company_id: companyId,
    label: 'any_name',
    phone: 'any_phone',
});
describe('DeleteSector Service', () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        fakeSectorRepository = new FakeSectorRepository_1.default();
        createSectorService = new CreateSectorService_1.default(fakeCompanyRepository, fakeSectorRepository);
        deleteSectorService = new DeleteSectorService_1.default(fakeSectorRepository);
    });
    test('Should be able to delete an sector with correct value', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeRequestCompany());
        const sector = yield createSectorService.execute(makeFakeRequestSector(company.id));
        const deleteSpy = jest.spyOn(deleteSectorService, 'execute');
        yield deleteSectorService.execute(sector.id);
        expect(deleteSpy).toHaveBeenCalledWith(sector.id);
    }));
    test('Should not delete sector if invalid sector_id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(deleteSectorService.execute(0)).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
