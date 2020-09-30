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
const Option_1 = __importDefault(require("@modules/chatbot/infra/typeorm/entities/Option"));
class FakeOptionRepository {
    constructor() {
        this.options = [];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const option = this.options.find(foundOption => foundOption.id === id);
            return option;
        });
    }
    create({ container_id, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const option = new Option_1.default();
            Object.assign(option, { id: this.options.length + 1, description, container_id });
            this.options.push(option);
            return option;
        });
    }
    save(option) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.options.findIndex(selectedUser => selectedUser.id === option.id);
            this.options[index] = option;
            return option;
        });
    }
}
exports.default = FakeOptionRepository;
