"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const upload_1 = __importDefault(require("@config/upload"));
const DiskStorageProvider_1 = __importDefault(require("./implementations/DiskStorageProvider"));
const S3StorageProvider_1 = __importDefault(require("./implementations/S3StorageProvider"));
tsyringe_1.container.registerSingleton('StorageProvider', upload_1.default.driver === 'disk' ? DiskStorageProvider_1.default : S3StorageProvider_1.default);
