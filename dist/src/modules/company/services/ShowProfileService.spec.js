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
const ShowProfileService_1 = __importDefault(require("./ShowProfileService"));
const FakeCompanyRepository_1 = __importDefault(require("../repositories/fakes/FakeCompanyRepository"));
const CreateCompanyService_1 = __importDefault(require("./CreateCompanyService"));
let fakeCompanyRepository;
let showProfileService;
let createCompanyService;
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
describe('ShowProfile Service', () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompanyRepository_1.default();
        showProfileService = new ShowProfileService_1.default(fakeCompanyRepository);
        createCompanyService = new CreateCompanyService_1.default(fakeCompanyRepository);
    });
    test('Should be return an company profile if correct value is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield createCompanyService.execute(makeFakeRequest());
        const showSpy = jest.spyOn(showProfileService, 'execute');
        showProfileService.execute(company.id);
        expect(showSpy).toHaveBeenLastCalledWith(company.id);
    }));
    it('Should not be able show profile if invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(showProfileService.execute(999)).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
