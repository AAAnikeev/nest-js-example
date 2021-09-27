import { env } from 'process';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1632165139281 implements MigrationInterface {
  name = 'CreateUserTable1632165139281';
  public tableName = 'user';

  public schemaName = env.NODE_ENV === 'test' ? 'test' : 'public';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
        schema: this.schemaName,
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
