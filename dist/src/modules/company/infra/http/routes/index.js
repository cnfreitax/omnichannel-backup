"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("@modules/chatbot/infra/http/routes"));
const company_routes_1 = __importDefault(require("./company.routes"));
const sector_routes_1 = __importDefault(require("./sector.routes"));
const profile_routes_1 = __importDefault(require("./profile.routes"));
const router = express_1.Router();
router.use('/company', company_routes_1.default);
router.use('/sector', sector_routes_1.default);
routes_1.default.use('/company/profile', profile_routes_1.default);
exports.default = router;
