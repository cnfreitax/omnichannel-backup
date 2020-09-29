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
const User_1 = __importDefault(require("@modules/user/infra/typeorm/entities/User"));
class FakeUserRepository {
    constructor() {
        this.users = [];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(selectedUser => selectedUser.id === id);
            return user;
        });
    }
    listAllUsers({ sector_id, company_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            let users;
            if (company_id) {
                users = this.users.filter(listUsers => {
                    return listUsers.company_id === company_id;
                });
            }
            else if (sector_id) {
                users = this.users.filter(listUsers => {
                    return listUsers.sector_id === sector_id;
                });
            }
            else {
                users = this.users;
            }
            return users;
        });
    }
    searchUsers({ name, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            let users;
            if (name) {
                users = this.users.filter(listUsers => {
                    return listUsers.name === name;
                });
            }
            else if (email) {
                users = this.users.filter(listUsers => {
                    return listUsers.email === email;
                });
            }
            else {
                users = this.users;
            }
            return users;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(selectedUser => selectedUser.email === email);
            return user;
        });
    }
    create({ email, name, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default();
            const date = new Date();
            const id = date.getTime() + Math.round(Math.random() * 100);
            Object.assign(user, { id, email, password, name });
            this.users.push(user);
            return user;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex(selectedUser => selectedUser.id === user.id);
            this.users[index] = user;
            return user;
        });
    }
}
exports.default = FakeUserRepository;
