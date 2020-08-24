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
          { name: 'type', type: 'varchar', default: null },
          { name: 'company', type: 'varchar', default: null },
          { name: 'message', type: 'varchar', default: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
    await queryRunner.manager.
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
