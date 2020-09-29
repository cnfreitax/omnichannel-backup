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
const FakeHashProvider_1 = __importDefault(require("@modules/user/providers/HashProvider/fakes/FakeHashProvider"));
const FakeUserRepository_1 = __importDefault(require("@modules/user/repositories/fakes/FakeUserRepository"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
const makeFakeUser = () => ({
    name: 'any_name',
    email: 'any@mail.com',
    password: 'any_password',
    access_level: 'adm',
});
let fakeUserRepository;
let fakeHashProvider;
let createUser;
describe('Create User Service', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        createUser = new CreateUserService_1.default(fakeUserRepository, fakeHashProvider);
    });
    it('Should be able to create a new Company', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUser.execute(makeFakeUser());
        expect(user).toHaveProperty('id');
    }));
    it('Should not be able create two Users with the same email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser.execute(makeFakeUser());
        expect(createUser.execute({
            email: 'any@mail.com',
            name: 'any_name',
            password: 'any_password',
            access_level: 'adm',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('Should not be able create a user if invalid_access is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(createUser.execute({
            email: 'any@mail.com',
            name: 'any_name',
            password: 'any_password',
            access_level: 'invalid_token',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
