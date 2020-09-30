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
const CreateContainerService_1 = __importDefault(require("@modules/chatbot/services/CreateContainerService"));
const ListAllCompanyContainersService_1 = __importDefault(require("@modules/chatbot/services/ListAllCompanyContainersService"));
const UpdateContainerService_1 = __importDefault(require("@modules/chatbot/services/UpdateContainerService"));
class ContainerController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_id } = req.query;
            const listCompanyContainers = tsyringe_1.container.resolve(ListAllCompanyContainersService_1.default);
            const companyContainers = yield listCompanyContainers.execute(Number(company_id));
            return res.json(companyContainers);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_id } = req.params;
            const { description, type, from, to, content, expects_input } = req.body;
            const createContainer = tsyringe_1.container.resolve(CreateContainerService_1.default);
            const message = yield createContainer.execute({
                company_id: Number(company_id),
                description,
                type,
                content,
                from,
                to,
                expects_input,
            });
            return res.json(message);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { container_id } = req.params;
            const { from, to, content, description, expects_input } = req.body;
            const updateContainer = tsyringe_1.container.resolve(UpdateContainerService_1.default);
            const message = yield updateContainer.execute({
                id: Number(container_id),
                content,
                description,
                to: Number(to),
                from: Number(from),
                expects_input,
            });
            return res.json(message);
        });
    }
}
exports.default = ContainerController;
