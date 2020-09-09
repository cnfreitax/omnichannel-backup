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
const UpdateCompanyService_1 = __importDefault(require("@modules/company/services/UpdateCompanyService"));
const ShowProfileService_1 = __importDefault(require("@modules/company/services/ShowProfileService"));
class ProfileCompanyController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const viewCompany = tsyringe_1.container.resolve(ShowProfileService_1.default);
            const company = yield viewCompany.execute(Number(id));
            return res.json(class_transformer_1.classToClass(company));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email, address, ddd, activity, website } = req.body;
            const formatId = Number(id);
            const updateCompany = tsyringe_1.container.resolve(UpdateCompanyService_1.default);
            const user = yield updateCompany.execute({ id: formatId, name, email, address, ddd, activity, website });
            return res.json(class_transformer_1.classToClass(user));
        });
    }
}
exports.default = ProfileCompanyController;
