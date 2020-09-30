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
const typeorm_1 = require("typeorm");
const Chatline_1 = __importDefault(require("../entities/Chatline"));
class CustomerStageRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Chatline_1.default);
    }
    findChatline(company_id, chatline_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatline = yield this.ormRepository.findOne({
                where: {
                    company_id,
                    chatline_id,
                },
            });
            return chatline;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatline = this.ormRepository.create(data);
            yield this.ormRepository.save(chatline);
            return chatline;
        });
    }
    deleteChatline(chatline_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ormRepository.delete(chatline_id);
        });
    }
    findByAttendant(attendantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.ormRepository.findOne({ where: { attendant_id: attendantId } });
            return chat;
        });
    }
}
exports.default = CustomerStageRepository;