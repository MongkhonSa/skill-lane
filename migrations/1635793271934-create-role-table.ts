import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRoleTable1635793271934 implements MigrationInterface {
  name = 'createRoleTable1635793271934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_cbb8cdf197992a93da55155c14e" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_09d115a69b6014d324d592f9c4" ON "user_roles_role" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0e2f5483d5e8d52043f9763453" ON "user_roles_role" ("role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_09d115a69b6014d324d592f9c42" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_0e2f5483d5e8d52043f97634538" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_0e2f5483d5e8d52043f97634538"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_09d115a69b6014d324d592f9c42"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0e2f5483d5e8d52043f9763453"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_09d115a69b6014d324d592f9c4"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
