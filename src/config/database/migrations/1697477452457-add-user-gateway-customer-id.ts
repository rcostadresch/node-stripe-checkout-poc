import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserGatewayCustomerId1697477452457 implements MigrationInterface {
  name = 'addUserGatewayCustomerId1697477452457'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "gateway_customer_id" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gateway_customer_id"`)
  }
}
