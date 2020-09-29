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
class CreateContainers1599052485998 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'containers',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                    },
                    { name: 'expects_input', type: 'boolean', default: false },
                    { name: 'from', type: 'int', isNullable: true, default: null },
                    { name: 'to', type: 'int', isNullable: true, default: null },
                    { name: 'description', type: 'varchar', isNullable: false },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['greeting', 'chat', 'menu', 'message', 'media', 'api', 'survey', 'end_service', 'end_chatbot'],
                        default: '"greeting"',
                    },
                    { name: 'company_id', type: 'int', default: null },
                    { name: 'content', type: 'json', isNullable: true, default: null },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ],
                foreignKeys: [
                    {
                        name: 'MessageCompany',
                        referencedTableName: 'companies',
                        referencedColumnNames: ['id'],
                        columnNames: ['company_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('containers');
        });
    }
}
exports.default = CreateContainers1599052485998;
