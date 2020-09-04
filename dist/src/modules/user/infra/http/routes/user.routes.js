"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const UserController_1 = __importDefault(require("@modules/user/infra/http/controllers/UserController"));
const userController = new UserController_1.default();
const userRouter = express_1.Router();
userRouter.post('/:access_level', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
    },
}), userController.create);
exports.default = userRouter;
