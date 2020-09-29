"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ProfileController_1 = __importDefault(require("@modules/company/infra/http/controllers/ProfileController"));
const ensureAuthencticatedAdmUser_1 = __importDefault(require("@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser"));
const profileController = new ProfileController_1.default();
const profilesRouter = express_1.Router();
profilesRouter.use(ensureAuthencticatedAdmUser_1.default);
profilesRouter.get('/:id', celebrate_1.celebrate({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().required(),
    },
}), profileController.show);
profilesRouter.put('/:id', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        address: celebrate_1.Joi.string(),
        website: celebrate_1.Joi.string(),
        activity: celebrate_1.Joi.string(),
        ddd: celebrate_1.Joi.string(),
    },
}), profileController.update);
exports.default = profilesRouter;
