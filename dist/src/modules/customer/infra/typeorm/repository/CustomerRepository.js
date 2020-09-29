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
const Customer_1 = __importDefault(require("../entities/Customer"));
class CustomerRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Customer_1.default);
    }
    findByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.ormRepository.findOne({ where: { phone } });
            return customer;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = this.ormRepository.create(data);
            yield this.ormRepository.save(customer);
            return customer;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.ormRepository.findOne({ where: { id } });
            return customer;
        });
    }
}
exports.default = CustomerRepository;
