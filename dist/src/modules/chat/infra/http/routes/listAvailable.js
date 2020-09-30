"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ensureAuthencticatedAdmUser_1 = __importDefault(require("@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser"));
const availableUsersController_1 = __importDefault(require("../controller/availableUsersController"));
const availableUsersController = new availableUsersController_1.default();
const listUserAvailableRouter = express_1.Router();
listUserAvailableRouter.use(ensureAuthencticatedAdmUser_1.default);
listUserAvailableRouter.get('/', celebrate_1.celebrate({
    [celebrate_1.Segments.QUERY]: {
        company_id: celebrate_1.Joi.number(),
    },
}), availableUsersController.index);
exports.default = listUserAvailableRouter;
