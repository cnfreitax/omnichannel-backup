"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LogoutController_1 = __importDefault(require("@modules/user/infra/http/controllers/LogoutController"));
const logoutRouter = express_1.Router();
const logoutUser = new LogoutController_1.default();
logoutRouter.delete('/:user_id', logoutUser.delete);
exports.default = logoutRouter;
