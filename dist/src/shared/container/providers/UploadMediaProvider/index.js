"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const UploadMediaProvider_1 = __importDefault(require("./implementations/UploadMediaProvider"));
tsyringe_1.container.registerSingleton('UploadMediaProvider', UploadMediaProvider_1.default);
