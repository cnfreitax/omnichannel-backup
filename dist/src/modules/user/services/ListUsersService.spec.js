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
const FakeHashProvider_1 = __importDefault(require("@modules/user/providers/HashProvider/fakes/FakeHashProvider"));
const ListUsersService_1 = __importDefault(require("./ListUsersService"));
const FakeUserRepository_1 = __importDefault(require("../repositories/fakes/FakeUserRepository"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
let fakeUserRepository;
let listUser;
let fakeHashProvider;
let createUser;
const makeUser = () => ({
    name: 'any_name',
    email: 'any@mail.com',
    password: 'any_password',
    access_level: 'adm',
});
describe('ListUsers Service', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        createUser = new CreateUserService_1.default(fakeUserRepository, fakeHashProvider);
        listUser = new ListUsersService_1.default(fakeUserRepository);
    });
    test('Should list all users if company_id or sector_id not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser.execute(makeUser());
        const users = yield listUser.execute({});
        expect(users).toHaveLength(1);
    }));
    test('Should list users from company is sector_id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUser.execute(makeUser());
        user.sector_id = 1;
        const userFromSector = yield listUser.execute({ sector_id: 1 });
        expect(user.sector_id).toBe(1);
        expect(userFromSector).toHaveLength(1);
    }));
    test('Should list users from company is company_id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUser.execute(makeUser());
        user.company_id = 2;
        const userFromSector = yield listUser.execute({ company_id: 2 });
        expect(user.company_id).toBe(2);
        expect(userFromSector).toHaveLength(1);
    }));
});
