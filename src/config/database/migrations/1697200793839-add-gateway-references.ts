import { MigrationInterface, QueryRunner } from 'typeorm'

export class addGatewayReferences1697200793839 implements MigrationInterface {
  name = 'addGatewayReferences1697200793839'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "gateway_account_id" character varying`)
    await queryRunner.query(`ALTER TABLE "tickets" ADD "gateway_receipt_uri" character varying`)
    await queryRunner.query(`ALTER TABLE "products" ADD "gateway_product_id" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "gateway_product_id"`)
    await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "gateway_receipt_uri"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gateway_account_id"`)
  }
}
