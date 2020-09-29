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
const FakeSectorRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeSectorRepository"));
const FakeCompanyRepository_1 = __importDefault(require("@modules/company/repositories/fakes/FakeCompanyRepository"));
const CreateSectorService_1 = __importDefault(require("@modules/company/services/CreateSectorService"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeUserRepository_1 = __importDefault(require("../repositories/fakes/FakeUserRepository"));
const AssignUserToSectorService_1 = __importDefault(require("./AssignUserToSectorService"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
let fakeUserRepository;
let fakeSectorRepository;
let fakeHashProvider;
let fakeCompanyRepository;
let createSectorService;
let assignSector;
let createUser;
const makeFakeCompany = () => ({
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
const makeFakeUser = () => ({
    name: 'any_name',
    email: 'any@mail.com',
    password: 'any_password',
    access_level: 'adm',
});
describe('AssignUserToSectorService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository_1.default();
        fakeSectorRepository = new FakeSectorRepository_1.default();
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        fakeSectorRepository = new FakeSectorRepository_1.default();
        createSectorService = new CreateSectorService_1.default(fakeCompanyRepository, fakeSectorRepository);
        createUser = new CreateUserService_1.default(fakeUserRepository, fakeHashProvider);
        assignSector = new AssignUserToSectorService_1.default(fakeUserRepository, fakeSectorRepository);
    });
    test('Should assign a sector to a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUser.execute(makeFakeUser());
        const company = yield fakeCompanyRepository.create(makeFakeCompany());
        const sector = yield createSectorService.execute({
            company_id: company.id,
            label: 'any_name',
            phone: 'any_phone',
        });
        yield assignSector.execute({
            sector_id: sector.id,
            user_id: user.id,
        });
        expect(user.sector_id).toEqual(sector.id);
    }));
    test('Should return throws if sector does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUser.execute(makeFakeUser());
        yield expect(assignSector.execute({
            sector_id: 0,
            user_id: user.id,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    test('Should return throws if user does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield fakeCompanyRepository.create(makeFakeCompany());
        const sector = yield createSectorService.execute({
            company_id: company.id,
            label: 'any_name',
            phone: 'any_phone',
        });
        yield expect(assignSector.execute({
            sector_id: sector.id,
            user_id: 0,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
