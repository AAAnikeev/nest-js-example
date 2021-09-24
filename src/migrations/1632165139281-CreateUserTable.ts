import { env } from 'process';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1632165139281 implements MigrationInterface {
  name = 'CreateUserTable1632165139281';
  public tableName = 'user';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "lastChangedTme" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    // );

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
            name: 'lastChangedTime',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
        schema: env.NODE_ENV === 'test' ? 'test' : 'public',
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
