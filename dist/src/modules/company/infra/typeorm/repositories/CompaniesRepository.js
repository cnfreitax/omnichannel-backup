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
const Company_1 = __importDefault(require("@modules/company/infra/typeorm/entities/Company"));
class CompanyRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Company_1.default);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findCompany = yield this.ormRepository.findOne(id);
            return findCompany;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const findCompany = yield this.ormRepository.findOne({ where: { email } });
            return findCompany;
        });
    }
    findByCnpj(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const findCompany = yield this.ormRepository.findOne({
                where: { cnpj },
            });
            return findCompany;
        });
    }
    findAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            const companies = yield this.ormRepository.find();
            return companies;
        });
    }
    create(dataCompany) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = this.ormRepository.create(dataCompany);
            yield this.ormRepository.save(company);
            return company;
        });
    }
    save(company) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.save(company);
        });
    }
    del(company) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ormRepository.delete(company);
            return company;
        });
    }
}
exports.default = CompanyRepository;
