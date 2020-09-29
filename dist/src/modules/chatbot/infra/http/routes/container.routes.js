"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ContainerController_1 = __importDefault(require("@modules/chatbot/infra/http/controllers/ContainerController"));
const containerController = new ContainerController_1.default();
const containerRouter = express_1.Router();
containerRouter.get('/', containerController.index);
containerRouter.post('/:company_id', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        description: celebrate_1.Joi.string().required(),
        type: celebrate_1.Joi.string().required(),
        content: celebrate_1.Joi.object(),
        from: celebrate_1.Joi.string(),
        to: celebrate_1.Joi.string(),
        expects_input: celebrate_1.Joi.boolean(),
    },
}), containerController.create);
containerRouter.put('/:container_id', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        description: celebrate_1.Joi.string(),
        content: celebrate_1.Joi.object(),
        from: celebrate_1.Joi.string(),
        to: celebrate_1.Joi.string(),
        expects_input: celebrate_1.Joi.boolean(),
    },
}), containerController.update);
exports.default = containerRouter;
