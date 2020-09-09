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
const FakeUserRepository_1 = __importDefault(require("../repositories/fakes/FakeUserRepository"));
const ShowProfileService_1 = __importDefault(require("./ShowProfileService"));
let fakeUserRepository;
let showProfile;
describe('Update Profile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository_1.default();
        showProfile = new ShowProfileService_1.default(fakeUserRepository);
    });
    it('shoud be able to show profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUserRepository.create({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        const profile = yield showProfile.execute({
            id: user.id,
        });
        expect(profile.name).toBe('Eduardo');
        expect(profile.email).toBe('jj@email.com');
    }));
    it('Should not be able to show a non-existing profile', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUserRepository.create({
            email: 'jj@email.com',
            name: 'Eduardo',
            password: '123456',
            access_level: 'adm',
        });
        yield expect(showProfile.execute({
            id: 10,
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
