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
const typeorm_1 = require("typeorm");
const Available_1 = __importDefault(require("../entities/Available"));
class AvailableUserRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Available_1.default);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.ormRepository.create(data);
            yield this.ormRepository.save(user);
            return user;
        });
    }
    findById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ormRepository.findOne({ where: { user_id } });
            return user;
        });
    }
    find(company_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ormRepository.findOne({ where: { company_id, user_id } });
            return user;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ormRepository.save(user);
        });
    }
    delete(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ormRepository.findOne({ where: { user_id } });
            if (!user) {
                throw new AppError_1.default('Not found');
            }
            yield this.ormRepository.delete(user.id);
        });
    }
    listAttendants(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.ormRepository.find({ where: { company_id } });
            return users;
        });
    }
}
exports.default = AvailableUserRepository;
