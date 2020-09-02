"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const BcriptHashProvider_1 = __importDefault(require("@modules/user/providers/HashProvider/implementations/BcriptHashProvider"));
tsyringe_1.container.registerSingleton('HashProvider', BcriptHashProvider_1.default);
