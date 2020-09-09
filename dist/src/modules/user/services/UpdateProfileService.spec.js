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
const UpdateProfileService_1 = __importDefault(require("./UpdateProfileService"));
let fakeHashProvider;
let fakeUserRepository;
let updateProfile;
describe('Update Profile', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider_1.default();
        fakeUserRepository = new FakeUserRepository_1.default();
        updateProfile = new UpdateProfileService_1.default(fakeUserRepository, fakeHashProvider);
    });
    it('Should be able update profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUserRepository.create({
            email: 'any_@mail.com',
            name: 'any_mail',
            password: '123',
            access_level: 'adm',
        });
        const updatedUser = yield updateProfile.execute({
            id: user.id,
            name: 'any_new_name',
            email: 'any_new@mail.com',
        });
        expect(updatedUser.name).toBe('any_new_name');
        expect(updatedUser.email).toBe('any_new@mail.com');
    }));
    it('shoud be not able to update a non-existing profiler', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUserRepository.create({
            email: 'any@mail.com',
            name: 'any_name',
            password: 'password',
            access_level: 'adm',
        });
        yield expect(updateProfile.execute({
            id: 999,
            name: 'any_name',
            email: 'any@mail.com',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('Should not be able to update email whit an existent email from other user ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUserRepository.create({
            email: 'any@mail.com',
            name: 'any_mail',
            password: '123',
            access_level: 'adm',
        });
        const user = yield fakeUserRepository.create({
            email: 'any@mail.com',
            name: 'any_second_name',
            password: '123',
            access_level: 'adm',
        });
        yield expect(updateProfile.execute({
            id: user.id,
            email: 'any@mail.com',
            name: 'any_name',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('Should be able to update password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUserRepository.create({
            email: 'any@mail.com',
            name: 'any_name',
            password: 'old_password',
            access_level: 'adm',
        });
        const updatedUser = yield updateProfile.execute({
            id: user.id,
            email: 'any@mail.com',
            name: 'any_name',
            password: 'new_password',
            oldPassword: 'old_password',
        });
        expect(updatedUser.password).toBe('new_password');
    }));
    it('Should not be able to update password without an old password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUserRepository.create({
            email: 'any@mail.com',
            name: 'any_name',
            password: 'old_password',
            access_level: 'adm',
        });
        yield expect(updateProfile.execute({
            id: user.id,
            email: 'any@mail.com',
            name: 'any_name',
            password: 'old_password',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('Should not be able to update password with wrong old password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUserRepository.create({
            email: 'any@mail.com',
            name: 'any_name',
            password: 'old_password',
            access_level: 'adm',
        });
        yield expect(updateProfile.execute({
            id: user.id,
            email: 'any@mail.com',
            name: 'any_name',
            password: 'new_password',
            oldPassword: 'wrong_password',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
