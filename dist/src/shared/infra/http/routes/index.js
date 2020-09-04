"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("@modules/user/infra/http/routes/user.routes"));
const sessions_routes_1 = __importDefault(require("@modules/user/infra/http/routes/sessions.routes"));
const company_routes_1 = __importDefault(require("@modules/company/infra/http/routes/company.routes"));
const sector_routes_1 = __importDefault(require("@modules/company/infra/http/routes/sector.routes"));
const profiles_routes_1 = __importDefault(require("@modules/user/infra/http/routes/profiles.routes"));
const assignSector_routes_1 = __importDefault(require("@modules/user/infra/http/routes/assignSector.routes"));
const listUser_routes_1 = __importDefault(require("@modules/user/infra/http/routes/listUser.routes"));
const routes = express_1.Router();
routes.use('/api/signup', user_routes_1.default); // register user
routes.use('/api/signin', sessions_routes_1.default); // session
routes.use('/api/company', company_routes_1.default); // create and list company
routes.use('/api/company/sector', sector_routes_1.default); // create sector
routes.use('/api/profile', profiles_routes_1.default); // edit and view profile
routes.use('/api/sector', assignSector_routes_1.default); // assing sector to a user
routes.use('/api/users', listUser_routes_1.default); // List all users, from company or sector
exports.default = routes;
