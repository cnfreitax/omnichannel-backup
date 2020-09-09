"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const ContainerRepository_1 = __importDefault(require("@modules/chatbot/infra/typeorm/repositories/ContainerRepository"));
tsyringe_1.container.registerSingleton('ContainerRepository', ContainerRepository_1.default);
