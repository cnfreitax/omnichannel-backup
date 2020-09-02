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
const FakeUserRepository_1 = __importDefault(require("../repositories/fakes/FakeUserRepository"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
const AuthUserService_1 = __importDefault(require("./AuthUserService"));
let fakeUserRepository;
let fakeHashProvider;
let authUser;
let createUser;
describe('User SignUp', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        authUser = new AuthUserService_1.default(fakeUserRepository, fakeHashProvider);
        createUser = new CreateUserService_1.default(fakeUserRepository, fakeHashProvider);
    });
    it('Should be able to user signUp', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser.execute({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        const response = yield authUser.execute({
            email: 'jj@email.com',
            password: '123456',
        });
        expect(response).toHaveProperty('token');
    }));
    it('shoud not be able to login with incorrect email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser.execute({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        expect(authUser.execute({
            email: 'jjj@email.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('Should not be able to login with incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser.execute({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        expect(authUser.execute({
            email: 'jj@email.com',
            password: '1234564',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
