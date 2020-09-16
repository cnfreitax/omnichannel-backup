import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCompanies1598531724133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
  }
}
