"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ProfileController_1 = __importDefault(require("@modules/user/infra/http/controllers/ProfileController"));
const ensureAuthenticated_1 = __importDefault(require("@modules/user/infra/http/middlewares/ensureAuthenticated"));
const profileController = new ProfileController_1.default();
const profilesRouter = express_1.Router();
profilesRouter.use(ensureAuthenticated_1.default);
profilesRouter.get('/profile', profileController.show);
profilesRouter.put('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        sector: celebrate_1.Joi.number(),
        oldPassword: celebrate_1.Joi.string(),
        password: celebrate_1.Joi.string(),
        password_confirmation: celebrate_1.Joi.string().valid(celebrate_1.Joi.ref('password')),
    },
}), profileController.update);
exports.default = profilesRouter;
