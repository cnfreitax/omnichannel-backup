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
const AssignUserToSectorService_1 = __importDefault(require("@modules/user/services/AssignUserToSectorService"));
class UserSectorController {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sector_id } = req.params;
            const { user_id } = req.body;
            const sectorIdToNumber = Number(sector_id);
            const assignUserToSector = tsyringe_1.container.resolve(AssignUserToSectorService_1.default);
            assignUserToSector.execute({ user_id, sector_id: sectorIdToNumber });
            return res.json({ ok: true });
        });
    }
}
exports.default = UserSectorController;
