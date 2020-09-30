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
const class_transformer_1 = require("class-transformer");
const CreateSectorService_1 = __importDefault(require("@modules/company/services/CreateSectorService"));
const ListAllCompanySectorsService_1 = __importDefault(require("@modules/company/services/ListAllCompanySectorsService"));
const DeleteSectorService_1 = __importDefault(require("@modules/company/services/DeleteSectorService"));
class SectorController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_id } = req.params;
            const companyFormat = Number(company_id);
            const listAllCompanySectors = tsyringe_1.container.resolve(ListAllCompanySectorsService_1.default);
            const allSectors = yield listAllCompanySectors.execute(companyFormat);
            return res.json(class_transformer_1.classToClass(allSectors));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { label, phone } = req.body;
            const { company_id } = req.params;
            const companyIdToNumber = Number(company_id);
            const createSectorService = tsyringe_1.container.resolve(CreateSectorService_1.default);
            const sector = yield createSectorService.execute({
                label,
                phone,
                company_id: companyIdToNumber,
            });
            return res.json(class_transformer_1.classToClass(sector));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteSectorService = tsyringe_1.container.resolve(DeleteSectorService_1.default);
            const sector = yield deleteSectorService.execute(Number(id));
            return res.json(class_transformer_1.classToClass(sector));
        });
    }
}
exports.default = SectorController;
