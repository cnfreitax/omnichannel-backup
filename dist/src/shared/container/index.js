"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
require("@modules/user/providers");
require("./providers");
const UserRepository_1 = __importDefault(require("@modules/user/infra/typeorm/repositories/UserRepository"));
const CompaniesRepository_1 = __importDefault(require("@modules/company/infra/typeorm/repositories/CompaniesRepository"));
const SectorRepository_1 = __importDefault(require("@modules/company/infra/typeorm/repositories/SectorRepository"));
tsyringe_1.container.registerSingleton('UserRepository', UserRepository_1.default);
tsyringe_1.container.registerSingleton('CompaniesRepository', CompaniesRepository_1.default);
tsyringe_1.container.registerSingleton('SectorRepository', SectorRepository_1.default);
