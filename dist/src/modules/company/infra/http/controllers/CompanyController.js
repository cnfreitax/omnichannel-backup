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
const CreateCompanyService_1 = __importDefault(require("@modules/company/services/CreateCompanyService"));
const ListAllCompaniesService_1 = __importDefault(require("@modules/company/services/ListAllCompaniesService"));
class CompaniesController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listAllCompaniesService = tsyringe_1.container.resolve(ListAllCompaniesService_1.default);
            const allCompanies = yield listAllCompaniesService.execute();
            return res.json(class_transformer_1.classToClass(allCompanies));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, cnpj } = req.body;
            const createCompanyService = tsyringe_1.container.resolve(CreateCompanyService_1.default);
            const company = yield createCompanyService.execute({
                name,
                cnpj,
            });
            return res.json(class_transformer_1.classToClass(company));
        });
    }
}
exports.default = CompaniesController;
