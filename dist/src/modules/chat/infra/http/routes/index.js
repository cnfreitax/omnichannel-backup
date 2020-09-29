"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listAvailable_1 = __importDefault(require("./listAvailable"));
const routes = express_1.Router();
routes.use('/available', listAvailable_1.default);
exports.default = routes;
