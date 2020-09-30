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
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const CreateUserService_1 = __importDefault(require("@modules/user/services/CreateUserService"));
const ListUsersService_1 = __importDefault(require("@modules/user/services/ListUsersService"));
const SearchUsersService_1 = __importDefault(require("@modules/user/services/SearchUsersService"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const { access_level } = req.params;
            const createUserService = tsyringe_1.container.resolve(CreateUserService_1.default);
            const user = yield createUserService.execute({
                name,
                email,
                access_level,
                password,
            });
            return res.json(class_transformer_1.classToClass(user));
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_id, sector_id } = req.query;
            const listUser = tsyringe_1.container.resolve(ListUsersService_1.default);
            const companyIdFormat = Number(company_id);
            const sectorIdFormat = Number(sector_id);
            const userList = yield listUser.execute({ company_id: companyIdFormat, sector_id: sectorIdFormat });
            return res.json(userList);
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.query;
            const searchUsers = tsyringe_1.container.resolve(SearchUsersService_1.default);
            const usersList = yield searchUsers.execute({ name, email });
            return res.json(usersList);
        });
    }
}
exports.default = UserController;
