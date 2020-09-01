import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1598551829404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
