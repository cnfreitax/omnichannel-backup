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
const Option_1 = __importDefault(require("../entities/Option"));
class OptionRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Option_1.default);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.ormRepository.create(data);
            yield this.ormRepository.save(message);
            return message;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const option = yield this.ormRepository.findOne({ where: { id } });
            return option;
        });
    }
    save(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.save(option);
        });
    }
}
exports.default = OptionRepository;
