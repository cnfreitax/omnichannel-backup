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
const HandleClientMessageService_1 = __importDefault(require("@modules/messageHandler/service/HandleClientMessageService"));
const tsyringe_1 = require("tsyringe");
class MessageController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let bodyData = String(req.body);
            bodyData = bodyData.replace(/'/g, '"');
            let jsonData;
            jsonData = JSON.parse(bodyData);
            console.log('RECEIVED MESSAGE', jsonData);
            const handleMessage = tsyringe_1.container.resolve(HandleClientMessageService_1.default);
            yield handleMessage.execute(jsonData);
            return res.send(200);
        });
    }
    status(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let bodyData = String(req.body);
            // bodyData = bodyData.replace(/'/g, '"');
            // const jsonData = JSON.parse(bodyData);
            // console.log('STATUS', jsonData);
            return res.send(200);
        });
    }
}
exports.default = MessageController;
