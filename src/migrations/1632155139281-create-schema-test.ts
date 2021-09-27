import { MigrationInterface, QueryRunner} from 'typeorm';

export class createSchemaTest1632155139281 implements MigrationInterface {
  public schemaName = 'test';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema(this.schemaName);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema(this.schemaName);
  }
}
