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
const UpdateOptionService_1 = __importDefault(require("@modules/chatbot/services/UpdateOptionService"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
class UpdateOptionController {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, to } = req.body;
                const { optionId } = req.params;
                const formatOptionId = Number(optionId);
                const updateOption = tsyringe_1.container.resolve(UpdateOptionService_1.default);
                const option = yield updateOption.execute({ description, to, optionId: formatOptionId });
                return res.json(option);
            }
            catch (errr) {
                throw new AppError_1.default('Server error', 500);
            }
        });
    }
}
exports.default = UpdateOptionController;
