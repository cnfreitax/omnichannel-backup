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
const CreateOptionService_1 = __importDefault(require("@modules/chatbot/services/CreateOptionService"));
const tsyringe_1 = require("tsyringe");
class OptionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description } = req.body;
            const { container_id } = req.params;
            const containerIdFormat = Number(container_id);
            const createOptionService = tsyringe_1.container.resolve(CreateOptionService_1.default);
            const option = yield createOptionService.execute({ description, container_id: containerIdFormat });
            return res.json(option);
        });
    }
}
exports.default = OptionController;
