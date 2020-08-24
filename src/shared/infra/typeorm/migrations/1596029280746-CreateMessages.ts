import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMessages1596029280746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          { name: 'parent_id', type: 'int', default: null },
          {
            name: 'type',
            type: 'enum',
            enum: ['greeting', 'chat', 'submenu', 'message', 'media', 'api', 'survey', 'end_service', 'end_chatbot'],
            default: '"greeting"',
          },
          { name: 'company_id', type: 'int', default: null },
          { name: 'message', type: 'varchar', default: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'MessageCompany',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['company_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
