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
const Company_1 = __importDefault(require("@modules/company/infra/typeorm/entities/Company"));
class FakeCompanyRepository {
    constructor() {
        this.companies = [];
    }
    findAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.companies;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findCompany = this.companies.find(company => company.id === id);
            return findCompany;
        });
    }
    findByCnpj(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const findCompany = this.companies.find(company => company.cnpj === cnpj);
            return findCompany;
        });
    }
    create({ name, cnpj }) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = new Company_1.default();
            const date = new Date();
            const id = date.getTime() + Math.round(Math.random() * 100);
            Object.assign(company, { id, name, cnpj });
            this.companies.push(company);
            return company;
        });
    }
    save(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.companies.findIndex(findCompany => findCompany.id === company.id);
            this.companies[index] = company;
            return company;
        });
    }
}
exports.default = FakeCompanyRepository;
