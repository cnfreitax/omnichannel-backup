"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const mime_1 = __importDefault(require("mime"));
const upload_1 = __importDefault(require("@config/upload"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
class S3StorageProvider {
    constructor() {
        this.client = new aws_sdk_1.default.S3({
            region: 'us-east-2',
        });
    }
    saveFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalPath = path_1.default.resolve(upload_1.default.tmpFolder, file);
            const ContentType = mime_1.default.getType(originalPath);
            if (!ContentType) {
                throw new AppError_1.default('File not found');
            }
            const fileContent = yield fs_1.default.promises.readFile(originalPath);
            yield this.client
                .putObject({
                Bucket: upload_1.default.config.aws.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
                ContentDisposition: `inline; filename=${file}`,
            })
                .promise();
            yield fs_1.default.promises.unlink(originalPath);
            return file;
        });
    }
    deleteFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .deleteObject({
                Bucket: 'omnichannel-union',
                Key: file,
            })
                .promise();
        });
    }
}
exports.default = S3StorageProvider;
