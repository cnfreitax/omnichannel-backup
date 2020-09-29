"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
require("express-async-errors");
require("@shared/infra/typeorm");
require("@shared/container");
const app_1 = __importDefault(require("./config/app"));
const port = process.env.PORT || 3333;
// eslint-disable-next-line
app_1.default.listen(port, () => console.log('Server started'));
