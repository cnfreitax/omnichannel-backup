"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const SectorController_1 = __importDefault(require("@modules/company/infra/http/controllers/SectorController"));
const ensureAuthencticatedAdmUser_1 = __importDefault(require("@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser"));
const sectorController = new SectorController_1.default();
const sectorRouter = express_1.Router();
sectorRouter.use(ensureAuthencticatedAdmUser_1.default);
sectorRouter.get('/list/:company_id', sectorController.index);
sectorRouter.post('/new/:company_id', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        label: celebrate_1.Joi.string().required(),
        phone: celebrate_1.Joi.string().required(),
    },
}), sectorController.create);
exports.default = sectorRouter;
