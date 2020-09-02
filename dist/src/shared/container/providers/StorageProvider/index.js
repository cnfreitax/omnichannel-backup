"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const upload_1 = __importDefault(require("@config/upload"));
const DiskstorageProvider_1 = __importDefault(require("@shared/container/providers/StorageProvider/implementations/DiskstorageProvider"));
const providers = {
    disk: DiskstorageProvider_1.default,
};
tsyringe_1.container.registerSingleton('StorageProvider', providers[upload_1.default.driver]);
