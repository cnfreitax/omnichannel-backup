import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateContainers1599052485998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('containers');
  }
}
