"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const CostumerSurveyController_1 = __importDefault(require("@modules/chatbot/infra/http/controllers/CostumerSurveyController"));
const costumerSurveyController = new CostumerSurveyController_1.default();
const surveyRouter = express_1.Router();
surveyRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        text: celebrate_1.Joi.string().required(),
        type: celebrate_1.Joi.string().required(),
        parent_id: celebrate_1.Joi.string().optional(),
    },
}), costumerSurveyController.create);
exports.default = surveyRouter;
