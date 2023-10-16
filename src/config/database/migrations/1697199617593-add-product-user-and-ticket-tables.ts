import { MigrationInterface, QueryRunner } from 'typeorm'

export class addProductUserAndTicketTables1697199617593 implements MigrationInterface {
  name = 'addProductUserAndTicketTables1697199617593'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_6dc43b3c8cbde659f3cf9765198" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_9e5d81805ef813269767992d339" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_2e445270177206a97921e461710" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_2e445270177206a97921e461710"`)
    await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_9e5d81805ef813269767992d339"`)
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_6dc43b3c8cbde659f3cf9765198"`)
    await queryRunner.query(`DROP TABLE "tickets"`)
    await queryRunner.query(`DROP TABLE "products"`)
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
