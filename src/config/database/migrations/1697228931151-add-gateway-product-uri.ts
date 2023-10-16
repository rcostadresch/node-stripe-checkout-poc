import {MigrationInterface, QueryRunner} from "typeorm";

export class addGatewayProductUri1697228931151 implements MigrationInterface {
    name = 'addGatewayProductUri1697228931151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "gateway_product_uri" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "gateway_product_uri"`);
    }

}
