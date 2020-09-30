import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSurveyAnswer1601471847675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'survey_answers',
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
          { name: 'survey_answer', type: 'int' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'SurveyCompany',
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
            columnNames: ['company_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'SurveyCustomer',
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
    await queryRunner.dropTable('survey_answers');
  }
}
