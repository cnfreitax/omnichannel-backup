"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const CompanyController_1 = __importDefault(require("@modules/company/infra/http/controllers/CompanyController"));
const ListCompaniesController_1 = __importDefault(require("@modules/company/infra/http/controllers/ListCompaniesController"));
const ensureAuthencticatedAdmUser_1 = __importDefault(require("@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser"));
const companyController = new CompanyController_1.default();
const listCompaniesController = new ListCompaniesController_1.default();
const companyRouter = express_1.Router();
companyRouter.use(ensureAuthencticatedAdmUser_1.default);
companyRouter.get('/', companyController.index);
companyRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        cnpj: celebrate_1.Joi.string().required(),
    },
}), companyController.create);
companyRouter.get('/all-companies', listCompaniesController.show);
exports.default = companyRouter;
