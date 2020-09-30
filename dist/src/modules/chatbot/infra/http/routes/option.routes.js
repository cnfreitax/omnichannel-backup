"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const UpdateOptionController_1 = __importDefault(require("@modules/chatbot/infra/http/controllers/UpdateOptionController"));
const OptionController_1 = __importDefault(require("@modules/chatbot/infra/http/controllers/OptionController"));
const updateOptionController = new UpdateOptionController_1.default();
const optionController = new OptionController_1.default();
const optionRouter = express_1.Router();
optionRouter.post('/:container_id', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        description: celebrate_1.Joi.string().required(),
    },
}), optionController.create);
optionRouter.put('/:optionId', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        description: celebrate_1.Joi.string(),
        to: celebrate_1.Joi.string(),
    },
}), updateOptionController.update);
exports.default = optionRouter;
