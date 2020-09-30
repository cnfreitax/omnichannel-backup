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
let UpdateContainerService = class UpdateContainerService {
    constructor(containerRepository) {
        this.containerRepository = containerRepository;
    }
    execute(containerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.containerRepository.findById(containerData.id);
            if (!container) {
                throw new AppError_1.default('Container not found');
            }
            if (containerData.description) {
                container.description = containerData.description;
            }
            if (containerData.to) {
                const childContainer = yield this.containerRepository.findById(containerData.to);
                if (!childContainer) {
                    throw new AppError_1.default('Child container does not exist');
                }
                container.to = containerData.to;
            }
            if (containerData.from) {
                const parentContainer = yield this.containerRepository.findById(containerData.from);
                if (!parentContainer) {
                    throw new AppError_1.default('Parent container does not exist');
                }
                container.from = containerData.from;
            }
            if (containerData.content) {
                const containerContent = containerData.content;
                if (container.type === Container_1.ContainerType.MEDIA) {
                    if (!containerContent.media) {
                        throw new AppError_1.default('Invalid content type');
                    }
                    container.content = { media: containerContent.media };
                }
                else if (container.type === Container_1.ContainerType.API) {
                    if (!containerContent.api) {
                        throw new AppError_1.default('Invalid content type');
                    }
                    container.content = { api: containerContent.api };
                }
                else if (container.type === Container_1.ContainerType.MENU) {
                    if (!containerContent.options) {
                        throw new AppError_1.default('Invalid content type');
                    }
                    container.content = { options: containerContent.options };
                }
            }
            if (containerData.expects_input) {
                container.expects_input = containerData.expects_input;
            }
            const updatedContainer = yield this.containerRepository.save(container);
            return updatedContainer;
        });
    }
};
UpdateContainerService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('ContainerRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateContainerService);
exports.default = UpdateContainerService;
