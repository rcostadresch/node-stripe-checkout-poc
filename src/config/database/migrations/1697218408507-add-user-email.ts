import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserEmail1697218408507 implements MigrationInterface {
  name = 'addUserEmail1697218408507'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`)
  }
}
