import { MigrationInterface, QueryRunner } from 'typeorm';
import { env } from 'process';

export class setupUserTable1632379639932 implements MigrationInterface {
  public schemaName = env.NODE_ENV === 'test' ? 'test' : 'public';
  public tableName = 'user';
  public fullPath = this.schemaName + '.' + this.tableName;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TABLE ${this.fullPath}`);

    await queryRunner.query(
      `INSERT INTO ${this.fullPath} (email, name) VALUES('jazz323323@gmail.com', 'Алекс Аникей')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `TRUNCATE TABLE ${this.fullPath} RESTART IDENTITY CASCADE;`,
    );
  }
}
