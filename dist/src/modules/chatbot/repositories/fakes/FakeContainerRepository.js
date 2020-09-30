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
const Container_1 = __importDefault(require("@modules/chatbot/infra/typeorm/entities/Container"));
class FakeContainerRepository {
    constructor() {
        this.containers = [];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = this.containers.find(foundContainer => foundContainer.id === id);
            return container;
        });
    }
    create({ company_id, description, type, from, to }) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = new Container_1.default();
            Object.assign(container, { id: this.containers.length + 1, company_id, from, to, description, type });
            this.containers.push(container);
            return container;
        });
    }
    findExistingContainer({ company_id, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = this.containers.find(foundContainer => foundContainer.company_id === company_id && foundContainer.type === type);
            return container;
        });
    }
    save(container) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerIndex = this.containers.findIndex(foundContainer => foundContainer.id === container.id);
            this.containers[containerIndex] = container;
            return container;
        });
    }
    listAllCompanyContainers(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const containersCompany = [];
            this.containers.forEach(container => {
                if (container.company_id === company_id) {
                    containersCompany.push(container);
                }
            });
            return containersCompany;
        });
    }
}
exports.default = FakeContainerRepository;
