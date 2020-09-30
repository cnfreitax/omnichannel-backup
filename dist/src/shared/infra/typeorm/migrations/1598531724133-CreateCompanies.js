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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateCompanies1598531724133 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'companies',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                    },
                    { name: 'name', type: 'varchar', isUnique: true },
                    { name: 'cnpj', type: 'varchar', isUnique: true },
                    { name: 'codCampaign', type: 'varchar' },
                    { name: 'address', type: 'varchar' },
                    { name: 'email', type: 'varchar', isUnique: true },
                    { name: 'website', type: 'varchar' },
                    { name: 'activity', type: 'varchar' },
                    { name: 'ddd', type: 'varchar' },
                    { name: 'logo', type: 'varchar', isNullable: true },
                    { name: 'webhook_status', type: 'varchar', isNullable: true },
                    { name: 'webhook_response', type: 'varchar', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('companies');
        });
    }
}
exports.default = CreateCompanies1598531724133;
