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
class CreateUsers1598551829404 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                    },
                    { name: 'name', type: 'varchar' },
                    { name: 'email', type: 'varchar', isUnique: true },
                    { name: 'password', type: 'varchar' },
                    { name: 'access_level', type: 'varchar' },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                    { name: 'sector_id', type: 'int', isNullable: true },
                    { name: 'company_id', type: 'int', isNullable: true },
                ],
                foreignKeys: [
                    {
                        name: 'SectorUser',
                        referencedTableName: 'sectors',
                        referencedColumnNames: ['id'],
                        columnNames: ['sector_id'],
                        onDelete: 'SET NULL',
                    },
                    {
                        name: 'CompanyUser',
                        referencedTableName: 'companies',
                        referencedColumnNames: ['id'],
                        columnNames: ['company_id'],
                        onDelete: 'SET NULL',
                    },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('users');
        });
    }
}
exports.default = CreateUsers1598551829404;