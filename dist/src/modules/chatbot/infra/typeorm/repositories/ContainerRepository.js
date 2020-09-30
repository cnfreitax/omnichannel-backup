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
const Container_1 = __importDefault(require("@modules/chatbot/infra/typeorm/entities/Container"));
class ContainerRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Container_1.default);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.ormRepository.findOne({ where: { id } });
            return container;
        });
    }
    listAllCompanyContainers(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const containers = yield this.ormRepository.find({ where: { company_id } });
            return containers;
        });
    }
    findExistingContainer({ company_id, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.ormRepository.findOne({ where: { company_id, type } });
            return container;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = this.ormRepository.create(data);
            yield this.ormRepository.save(container);
            return container;
        });
    }
    save(container) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.save(container);
        });
    }
}
exports.default = ContainerRepository;