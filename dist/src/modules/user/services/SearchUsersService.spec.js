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
const FakeUserRepository_1 = __importDefault(require("../repositories/fakes/FakeUserRepository"));
const SearchUsersService_1 = __importDefault(require("./SearchUsersService"));
let fakeUserRepository;
let searchUsers;
describe('Search Users', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository_1.default();
        searchUsers = new SearchUsersService_1.default(fakeUserRepository);
    });
    it('shoud be able to search users by name', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUserRepository.create({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        yield fakeUserRepository.create({
            email: 'mm@email.com',
            name: 'Mario',
            password: '123456',
            access_level: 'adm',
        });
        const foundUsers = yield searchUsers.execute({
            name: 'Eduardo',
        });
        expect(foundUsers).toHaveLength(1);
    }));
    it('shoud be able to search users by email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUserRepository.create({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        yield fakeUserRepository.create({
            email: 'mm@email.com',
            name: 'Mario',
            password: '123456',
            access_level: 'adm',
        });
        const foundUsers = yield searchUsers.execute({
            email: 'mm@email.com',
        });
        expect(foundUsers).toHaveLength(1);
    }));
    it('shoud be able to search users by both', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUserRepository.create({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        yield fakeUserRepository.create({
            email: 'mm@email.com',
            name: 'Mario',
            password: '123456',
            access_level: 'adm',
        });
        const foundUsers = yield searchUsers.execute({
            name: 'Mario',
            email: 'mm@email.com',
        });
        expect(foundUsers).toHaveLength(1);
    }));
});
