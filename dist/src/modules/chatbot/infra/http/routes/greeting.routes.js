"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const GreetingController_1 = __importDefault(require("@modules/chatbot/infra/http/controllers/GreetingController"));
const greetingController = new GreetingController_1.default();
const greetingMessageRouter = express_1.Router();
greetingMessageRouter.post('/:company_id', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        description: celebrate_1.Joi.string().required(),
        type: celebrate_1.Joi.string().required(),
    },
}), greetingController.create);
exports.default = greetingMessageRouter;
