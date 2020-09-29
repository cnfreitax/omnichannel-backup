"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const tsyringe_1 = require("tsyringe");
const Container_1 = require("@modules/chatbot/infra/typeorm/entities/Container");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
let CreateMediaContainerService = class CreateMediaContainerService {
    constructor(uploadMediaProvider, storageProvider, containerRepository, companyRepository) {
        this.uploadMediaProvider = uploadMediaProvider;
        this.storageProvider = storageProvider;
        this.containerRepository = containerRepository;
        this.companyRepository = companyRepository;
    }
    execute(containerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.findById(containerData.company_id);
            let container = yield this.containerRepository.findById(containerData.container_id);
            if (!company) {
                throw new AppError_1.default('Company not found');
            }
            if (!container) {
                throw new AppError_1.default('Container not found');
            }
            if (container.type !== Container_1.ContainerType.MEDIA) {
                throw new AppError_1.default('Wrong message type');
            }
            if (!containerData.mediaFileName) {
                throw new AppError_1.default('Missing media file');
            }
            const fileName = yield this.storageProvider.saveFile(containerData.mediaFileName);
            const uploadedFileInfo = yield this.uploadMediaProvider.upload(fileName);
            container.content = {
                media: uploadedFileInfo,
            };
            const updatedContainer = yield this.containerRepository.save(container);
            return updatedContainer;
        });
    }
};
CreateMediaContainerService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UploadMediaProvider')),
    __param(1, tsyringe_1.inject('StorageProvider')),
    __param(2, tsyringe_1.inject('ContainerRepository')),
    __param(3, tsyringe_1.inject('CompaniesRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CreateMediaContainerService);
exports.default = CreateMediaContainerService;
