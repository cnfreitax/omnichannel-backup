"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageChatController_1 = __importDefault(require("../controller/messageChatController"));
const messageChatController = new messageChatController_1.default();
const messageChatRouter = express_1.Router();
messageChatRouter.post('/union/response', messageChatController.handle);
exports.default = messageChatRouter;
