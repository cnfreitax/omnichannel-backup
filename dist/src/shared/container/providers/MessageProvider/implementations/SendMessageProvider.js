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
class SendMessageProvider {
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let messagesToSend = data;
            messagesToSend.unshift({
                token: data[0].token,
                Telephone: data[0].Telephone,
                codCampaign: data[0].codCampaign,
                Message: '',
            });
            yield axios_1.default.post(process.env.WEB_HOOK_RESPONSE || 'default', messagesToSend);
        });
    }
    sendToAttendant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let messageToSend = data;
            yield axios_1.default.post(process.env.UNION_CHAT || 'default', messageToSend);
        });
    }
}
exports.default = SendMessageProvider;
