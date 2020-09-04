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
describe('Create User Service', () => {
    it('Should be able to create a new Company', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeUserRepository = new FakeUserRepository_1.default();
        const fakeHashProvider = new FakeHashProvider_1.default();
        const createUser = new CreateUserService_1.default(fakeUserRepository, fakeHashProvider);
        const user = yield createUser.execute({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        expect(user).toHaveProperty('id');
    }));
    it('Should not be able create two Company with the same email', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeUserRepository = new FakeUserRepository_1.default();
        const fakeHashProvider = new FakeHashProvider_1.default();
        const createUser = new CreateUserService_1.default(fakeUserRepository, fakeHashProvider);
        yield createUser.execute({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        expect(createUser.execute({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
