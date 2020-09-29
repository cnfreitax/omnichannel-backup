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
const tsyringe_1 = require("tsyringe");
const HandleMessageChat_1 = __importDefault(require("@modules/chat/service/HandleMessageChat"));
class MessageChatController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendantId = req.user.id;
            const { message } = req.body;
            const handleMessage = tsyringe_1.container.resolve(HandleMessageChat_1.default);
            yield handleMessage.execute({ message, attendantId });
            return res.send(204);
        });
    }
    status(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send(200);
        });
    }
}
exports.default = MessageChatController;
