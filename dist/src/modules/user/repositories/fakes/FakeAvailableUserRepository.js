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
const Available_1 = __importDefault(require("@modules/user/infra/typeorm/entities/Available"));
class FakeAvailableUserRepository {
    constructor() {
        this.availableUsers = [];
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const available = new Available_1.default();
            const date = new Date();
            const id = date.getTime() + Math.round(Math.random() * 100);
            Object.assign(available, { id, data });
            this.availableUsers.push(available);
            return available;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const available = this.availableUsers.find(availableUser => availableUser.id === id);
            return available;
        });
    }
    save(userAvailable) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.availableUsers.findIndex(selectedUser => selectedUser.id === userAvailable.id);
            this.availableUsers[index] = userAvailable;
        });
    }
    delete(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.availableUsers.findIndex(availableUser => availableUser.id === user_id);
            this.availableUsers.splice(index);
        });
    }
    find(user_id, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const available = this.availableUsers.find(availableUser => availableUser.id === user_id && availableUser.company_id === company_id);
            return available;
        });
    }
    listAttendants(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.availableUsers.filter(user => user.company_id === company_id);
            return users;
        });
    }
}
exports.default = FakeAvailableUserRepository;
