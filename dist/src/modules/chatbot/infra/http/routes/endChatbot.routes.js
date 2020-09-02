"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const EndOfChatbotController_1 = __importDefault(require("@modules/chatbot/infra/http/controllers/EndOfChatbotController"));
const endOfChatbotController = new EndOfChatbotController_1.default();
const endChatbotRouter = express_1.Router();
endChatbotRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        text: celebrate_1.Joi.string().required(),
        type: celebrate_1.Joi.string().required(),
        parent_id: celebrate_1.Joi.string().optional(),
    },
}), endOfChatbotController.create);
exports.default = endChatbotRouter;
