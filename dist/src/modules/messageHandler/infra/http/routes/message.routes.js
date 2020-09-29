"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = __importDefault(require("../Controller/MessageController"));
const messageController = new MessageController_1.default();
const messageRouter = express_1.Router();
messageRouter.post('/whatsapp/response', messageController.handle);
messageRouter.post('/whatsapp/status', messageController.status);
exports.default = messageRouter;
