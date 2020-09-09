"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const sessions_routes_1 = __importDefault(require("./sessions.routes"));
const listUser_routes_1 = __importDefault(require("./listUser.routes"));
const profiles_routes_1 = __importDefault(require("./profiles.routes"));
const assignSector_routes_1 = __importDefault(require("./assignSector.routes"));
const routes = express_1.Router();
routes.use('/signup', user_routes_1.default);
routes.use('/signin', sessions_routes_1.default);
routes.use('/users/list-users', listUser_routes_1.default);
routes.use('/profile', profiles_routes_1.default);
routes.use('/user-sector', assignSector_routes_1.default);
exports.default = routes;
