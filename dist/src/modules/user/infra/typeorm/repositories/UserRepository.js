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
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("@modules/user/infra/typeorm/entities/User"));
class UserRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(User_1.default);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ormRepository.findOne(Number(id));
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ormRepository.findOne({
                where: { email },
            });
            return user;
        });
    }
    searchUsers(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.ormRepository.find({ where: searchParams });
            return users;
        });
    }
    listAllUsers(listParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.ormRepository.find({ where: listParams });
            return users;
        });
    }
    create(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.ormRepository.create(dataUser);
            yield this.ormRepository.save(user);
            return user;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.save(user);
        });
    }
}
exports.default = UserRepository;
