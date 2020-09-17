import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClientStage1600195447269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'client_stage',
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
          { name: 'container_id', type: 'int' },
        ],
        foreignKeys: [
          {
            name: 'CompanyClient',
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
            columnNames: ['company_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ContainerStage',
            referencedTableName: 'containers',
            referencedColumnNames: ['id'],
            columnNames: ['container_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CustomerFk',
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            columnNames: ['customer_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('client_stage');
  }
}
