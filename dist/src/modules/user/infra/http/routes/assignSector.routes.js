"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const UserSectorController_1 = __importDefault(require("@modules/user/infra/http/controllers/UserSectorController"));
const ensureAuthencticatedAdmUser_1 = __importDefault(require("@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser"));
const userSectorController = new UserSectorController_1.default();
const sectorUserRoute = express_1.Router();
sectorUserRoute.use(ensureAuthencticatedAdmUser_1.default);
sectorUserRoute.put('/:sector_id', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        user_id: celebrate_1.Joi.number().required(),
    },
}), userSectorController.update);
exports.default = sectorUserRoute;
