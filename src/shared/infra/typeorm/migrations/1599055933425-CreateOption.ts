import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOption1599055933425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'options',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          { name: 'description', type: 'varchar' },
          { name: 'container_id', type: 'int' },
          { name: 'to', type: 'int', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'ContainerOption',
            referencedTableName: 'containers',
            referencedColumnNames: ['id'],
            columnNames: ['container_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('options');
  }
}
