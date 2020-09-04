"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const UserController_1 = __importDefault(require("@modules/user/infra/http/controllers/UserController"));
const userController = new UserController_1.default();
const listUserRouter = express_1.Router();
listUserRouter.get('/', celebrate_1.celebrate({
    [celebrate_1.Segments.QUERY]: {
        sector_id: celebrate_1.Joi.number(),
        company_id: celebrate_1.Joi.number(),
    },
}), userController.index);
listUserRouter.get('/search', celebrate_1.celebrate({
    [celebrate_1.Segments.QUERY]: {
        name: celebrate_1.Joi.string(),
        email: celebrate_1.Joi.string(),
    },
}), userController.show);
exports.default = listUserRouter;
