"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("@config/upload"));
const MediaController_1 = __importDefault(require("@modules/chatbot/infra/http/controllers/MediaController"));
const mediaController = new MediaController_1.default();
const containerRouter = express_1.Router();
const upload = multer_1.default(upload_1.default.multer);
// containerRouter.get('/', mediaContainerController.index);
containerRouter.put('/:company_id', upload.single('file'), mediaController.update);
// containerRouter.put(
//   '/:container_id',
//   celebrate({
//     [Segments.BODY]: {
//       description: Joi.string(),
//       content: Joi.object(),
//       from: Joi.string(),
//       to: Joi.string(),
//       expects_input: Joi.boolean(),
//     },
//   }),
//   upload.single('file'),
//   mediaContainerController.update,
// );
exports.default = containerRouter;
