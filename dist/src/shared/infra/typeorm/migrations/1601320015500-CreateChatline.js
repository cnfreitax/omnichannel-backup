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
exports.CreateChatline1601320015500 = void 0;
const typeorm_1 = require("typeorm");
class CreateChatline1601320015500 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'chatline',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                    },
                    { name: 'company_id', type: 'int' },
                    { name: 'customer_id', type: 'int' },
                    { name: 'attendant_id', type: 'int', isNullable: true, default: null },
                    { name: 'is_attended', type: 'boolean', default: false },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ],
                foreignKeys: [
                    {
                        name: 'ChatCompany',
                        referencedTableName: 'companies',
                        referencedColumnNames: ['id'],
                        columnNames: ['company_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'ChatCustomer',
                        referencedTableName: 'customers',
                        referencedColumnNames: ['id'],
                        columnNames: ['customer_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'ChatAttendant',
                        referencedTableName: 'attendants_available',
                        referencedColumnNames: ['id'],
                        columnNames: ['attendant_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('chatline');
        });
    }
}
exports.CreateChatline1601320015500 = CreateChatline1601320015500;
