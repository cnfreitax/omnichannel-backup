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
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const form_data_1 = __importDefault(require("form-data"));
const upload_1 = __importDefault(require("@config/upload"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
class UploadMediaProvider {
    upload(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            let uploadInfo;
            let uploadedFileInfo;
            const filePath = path_1.default.resolve(upload_1.default.uploadsFolder, fileName);
            const file = fs_1.default.createReadStream(filePath);
            const form = new form_data_1.default();
            form.append('File', file);
            const formHeaders = form.getHeaders();
            try {
                uploadInfo = yield axios_1.default.post('https://api.flexcontact.com.br/Messaging/UploadFile' || 'default', form, { headers: Object.assign({}, formHeaders) });
            }
            catch (e) {
                throw new AppError_1.default('API error');
            }
            uploadedFileInfo = uploadInfo.data;
            return uploadedFileInfo;
        });
    }
}
exports.default = UploadMediaProvider;
