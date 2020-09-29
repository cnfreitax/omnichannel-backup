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
const date_fns_1 = require("date-fns");
const tsyringe_1 = require("tsyringe");
const axios_1 = __importDefault(require("axios"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const Container_1 = require("@modules/chatbot/infra/typeorm/entities/Container");
const isNumeric_1 = __importDefault(require("@shared/utils/isNumeric"));
let HandleClientMessageService = class HandleClientMessageService {
    constructor(uploadMediaProvider, companyRepository, customerRepository, customerStageRepository, containerRepository, chatlineRepository, sendMessage, authApi, loginApi) {
        this.uploadMediaProvider = uploadMediaProvider;
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.customerStageRepository = customerStageRepository;
        this.containerRepository = containerRepository;
        this.chatlineRepository = chatlineRepository;
        this.sendMessage = sendMessage;
        this.authApi = authApi;
        this.loginApi = loginApi;
        this.messages = [];
        this.apiMessagesToSend = [];
    }
    checkCustomerExistsInChatline(customer, company, customer_message) {
        return __awaiter(this, void 0, void 0, function* () {
            let clientInChatline = yield this.chatlineRepository.findChatline(company.id, customer.id);
            if (clientInChatline) {
                if (clientInChatline.is_attended) {
                    this.sendMessage.sendToAttendant({ Message: customer_message, Telephone: customer.phone });
                }
            }
        });
    }
    addCustomerToChatline(customer, company) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chatlineRepository.create({
                company_id: company.id,
                customer_id: customer.id,
            });
        });
    }
    readMessageFromDatabase(container_id, customer, company) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.containerRepository.findById(container_id);
            if (!container) {
                throw new AppError_1.default('No container found');
            }
            return this.messagesToSend(container, customer, company);
        });
    }
    messagesToSend(messageFromDatabase, customer, company) {
        return __awaiter(this, void 0, void 0, function* () {
            let messageDescription = messageFromDatabase.description;
            if (this.apiMessagesToSend.length > 0) {
                this.apiMessagesToSend.forEach(apiMessage => {
                    this.messages.push({
                        token: this.token,
                        Telephone: customer.phone,
                        codCampaign: company.codCampaign,
                        Message: apiMessage,
                    });
                });
                this.apiMessagesToSend = [];
            }
            if (messageFromDatabase.type === Container_1.ContainerType.MENU) {
                if (messageFromDatabase.content.options) {
                    messageFromDatabase.content.options.forEach((option, index) => {
                        messageDescription = messageDescription.concat(`\n${index + 1}. ${option.description}`);
                    });
                }
                this.messages.push({
                    token: this.token,
                    Telephone: customer.phone,
                    codCampaign: company.codCampaign,
                    Message: messageDescription,
                });
            }
            else if (messageFromDatabase.type === Container_1.ContainerType.MEDIA) {
                if (messageFromDatabase.content.media) {
                    let containerMedia = messageFromDatabase.content.media;
                    const mediaValidDate = Date.parse(containerMedia.validUntil);
                    const expiredMedia = date_fns_1.isAfter(new Date(), mediaValidDate);
                    if (expiredMedia) {
                        const uploadedFileInfo = yield this.uploadMediaProvider.upload(containerMedia.nomeArquivo);
                        messageFromDatabase.content = {
                            media: uploadedFileInfo,
                        };
                        messageFromDatabase = yield this.containerRepository.save(messageFromDatabase);
                    }
                    this.messages.push({
                        token: this.token,
                        Telephone: customer.phone,
                        codCampaign: company.codCampaign,
                        Type: 'image',
                        idMedia: containerMedia.idMedia,
                    });
                }
            }
            else if (messageFromDatabase.type === Container_1.ContainerType.CHAT) {
                this.messages.push({
                    token: this.token,
                    Telephone: customer.phone,
                    codCampaign: company.codCampaign,
                    Message: 'Por favor aguarde. Um de nossos atendentes falará com você em breve',
                });
                this.addCustomerToChatline(customer, company);
            }
            else {
                this.messages.push({
                    token: this.token,
                    Telephone: customer.phone,
                    codCampaign: company.codCampaign,
                    Message: messageDescription,
                });
            }
            if (messageFromDatabase.to && !messageFromDatabase.expects_input) {
                return this.readMessageFromDatabase(messageFromDatabase.to, customer, company);
            }
            const currentStage = yield this.customerStageRepository.findStage(company.id, customer.id);
            if (currentStage) {
                currentStage.container_id = messageFromDatabase.id;
                yield this.customerStageRepository.updateStage(currentStage);
                if (messageFromDatabase.type === Container_1.ContainerType.END_CHATBOT) {
                    yield this.customerStageRepository.deleteStage(currentStage.id);
                }
            }
            return this.messages;
        });
    }
    checkUserInput(message, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.type === Container_1.ContainerType.MENU) {
                if (isNumeric_1.default(userInput)) {
                    const menuOptions = message.content.options ? message.content.options : [];
                    const userChosenOption = Number(userInput);
                    if (userChosenOption > 0 && userChosenOption <= menuOptions.length) {
                        const nextMessageId = menuOptions[userChosenOption - 1].container_id;
                        return this.containerRepository.findById(nextMessageId);
                    }
                }
            }
            else if (message.type === Container_1.ContainerType.API) {
                const apiInfo = message.content.api ? message.content.api : { url: '', param: '' };
                const apiParam = {};
                if (apiInfo.param) {
                    apiParam[apiInfo.param] = userInput;
                }
                yield axios_1.default.get(apiInfo.url, {
                    params: Object.assign({}, apiParam),
                })
                    .then(resp => {
                    this.apiMessagesToSend.push(resp.data.description);
                    return this.containerRepository.findById(message.to);
                })
                    .catch(err => {
                    throw new AppError_1.default('Unable to contact api');
                });
            }
            return message;
        });
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer;
            let message;
            let currentStage;
            const tokenValidate = yield this.authApi.checkTokenValidate();
            if (!tokenValidate) {
                const newToken = yield this.loginApi.login({ login: String(process.env.API_USERNAME), password: String(process.env.API_PASSWORD) });
                this.token = newToken.token;
            }
            else {
                const validToken = yield this.authApi.findToken();
                if (!validToken) {
                    throw new AppError_1.default('Token not found');
                }
                this.token = validToken.token;
            }
            const company = yield this.companyRepository.findByCodCampaign(data.codCampaign);
            if (!company) {
                throw new AppError_1.default('Company not found');
            }
            customer = yield this.customerRepository.findByPhone(data.Telephone);
            if (!customer) {
                customer = yield this.customerRepository.create({ phone: data.Telephone });
            }
            yield this.checkCustomerExistsInChatline(customer, company, data.message);
            currentStage = yield this.customerStageRepository.findStage(company.id, customer.id);
            if (!currentStage) {
                message = yield this.containerRepository.findExistingContainer({ company_id: company.id, type: Container_1.ContainerType.GREETING });
                if (!message) {
                    throw new AppError_1.default('Container not found');
                }
                currentStage = yield this.customerStageRepository.create({ company_id: company.id, container_id: message.id, customer_id: customer.id });
            }
            else {
                message = yield this.containerRepository.findById(currentStage.container_id);
                if (!message) {
                    throw new AppError_1.default('Container not found');
                }
                else if (message.expects_input) {
                    message = yield this.checkUserInput(message, data.message);
                    if (!message) {
                        throw new AppError_1.default('No next container');
                    }
                }
            }
            const messagesToSend = yield this.readMessageFromDatabase(message.id, customer, company);
            yield this.sendMessage.send(messagesToSend);
        });
    }
};
HandleClientMessageService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UploadMediaProvider')),
    __param(1, tsyringe_1.inject('CompaniesRepository')),
    __param(2, tsyringe_1.inject('CustomerRepository')),
    __param(3, tsyringe_1.inject('CustomerStageRepository')),
    __param(4, tsyringe_1.inject('ContainerRepository')),
    __param(5, tsyringe_1.inject('ChatlineRepository')),
    __param(6, tsyringe_1.inject('SendMessage')),
    __param(7, tsyringe_1.inject('AuthCodeApi')),
    __param(8, tsyringe_1.inject('LoginAPI')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object])
], HandleClientMessageService);
exports.default = HandleClientMessageService;
