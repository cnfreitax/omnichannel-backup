"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("@modules/chatbot/infra/http/routes"));
const routes_2 = __importDefault(require("@modules/user/infra/http/routes"));
const routes_3 = __importDefault(require("@modules/company/infra/http/routes"));
const router = express_1.Router();
const routesList = [routes_1.default, routes_2.default, routes_3.default];
for (const route of routesList) {
    router.use('/api', route);
}
exports.default = router;
