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
const Sector_1 = __importDefault(require("@modules/company/infra/typeorm/entities/Sector"));
class FakeSectorRepository {
    constructor() {
        this.sectors = [];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findSector = this.sectors.find(sector => sector.id === id);
            return findSector;
        });
    }
    findSectorCompany(label, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = this.sectors.find(selectedSector => selectedSector.company_id === company_id && selectedSector.label === label);
            return sector;
        });
    }
    findAllCompanySectors(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findSectors = [];
            this.sectors.forEach(sector => {
                if (sector.company_id === company_id) {
                    findSectors.push(sector);
                }
            });
            return findSectors;
        });
    }
    create({ company_id, label, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = new Sector_1.default();
            const date = new Date();
            const id = date.getTime() + Math.round(Math.random() * 100);
            Object.assign(sector, { id, company_id, label, phone });
            this.sectors.push(sector);
            return sector;
        });
    }
    save(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.sectors.findIndex(findSector => findSector.id === sector.id);
            this.sectors[index] = sector;
            return sector;
        });
    }
}
exports.default = FakeSectorRepository;
