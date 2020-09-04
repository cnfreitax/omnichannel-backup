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
const Sector_1 = __importDefault(require("@modules/company/infra/typeorm/entities/Sector"));
class SectorRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Sector_1.default);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findSector = yield this.ormRepository.findOne({ where: { id } });
            return findSector;
        });
    }
    findSectorCompany(label, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = yield this.ormRepository.findOne({ where: { label, company_id } });
            return sector;
        });
    }
    findAllCompanySectors(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this.ormRepository.find({
                where: { company_id },
            });
            return sectors;
        });
    }
    create({ company_id, label, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = this.ormRepository.create({ company_id, label, phone });
            yield this.ormRepository.save(sector);
            return sector;
        });
    }
    save(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.save(sector);
        });
    }
}
exports.default = SectorRepository;
