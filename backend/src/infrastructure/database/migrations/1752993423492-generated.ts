import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generated1752993423492 implements MigrationInterface {
  name = 'Generated1752993423492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`status\` enum ('AVAILABLE', 'UNAVAILABLE') NOT NULL, \`stock\` int NOT NULL DEFAULT '0', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`category_id\` int NULL, FULLTEXT INDEX \`IDX_4c9fb58de893725258746385e1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key_name\` varchar(80) NOT NULL, \`name_permission\` varchar(80) NOT NULL, UNIQUE INDEX \`IDX_4be56d0cb4f14292b2b5942d3b\` (\`key_name\`), UNIQUE INDEX \`IDX_e77c25aaad297ba331155532fa\` (\`name_permission\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id_role\` int NOT NULL AUTO_INCREMENT, \`name_role\` varchar(50) NOT NULL, PRIMARY KEY (\`id_role\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`refresh_token\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_permissions\` (\`id_role\` int NOT NULL, \`id_permission\` int NOT NULL, INDEX \`IDX_c0f5917f07a9e2bfd31ac5fb15\` (\`id_role\`), INDEX \`IDX_5e7caee2bb7c1030ab07ad70ec\` (\`id_permission\`), PRIMARY KEY (\`id_role\`, \`id_permission\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles\` (\`id_user\` int NOT NULL, \`id_role\` int NOT NULL, INDEX \`IDX_37a75bf56b7a6ae65144e0d5c0\` (\`id_user\`), INDEX \`IDX_af69ec5d5bd973309c025e7a62\` (\`id_role\`), PRIMARY KEY (\`id_user\`, \`id_role\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_c0f5917f07a9e2bfd31ac5fb154\` FOREIGN KEY (\`id_role\`) REFERENCES \`roles\`(\`id_role\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_5e7caee2bb7c1030ab07ad70ec2\` FOREIGN KEY (\`id_permission\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_37a75bf56b7a6ae65144e0d5c00\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_af69ec5d5bd973309c025e7a62e\` FOREIGN KEY (\`id_role\`) REFERENCES \`roles\`(\`id_role\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_af69ec5d5bd973309c025e7a62e\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_37a75bf56b7a6ae65144e0d5c00\``);
    await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_5e7caee2bb7c1030ab07ad70ec2\``);
    await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_c0f5917f07a9e2bfd31ac5fb154\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
    await queryRunner.query(`DROP INDEX \`IDX_af69ec5d5bd973309c025e7a62\` ON \`user_roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_37a75bf56b7a6ae65144e0d5c0\` ON \`user_roles\``);
    await queryRunner.query(`DROP TABLE \`user_roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_5e7caee2bb7c1030ab07ad70ec\` ON \`role_permissions\``);
    await queryRunner.query(`DROP INDEX \`IDX_c0f5917f07a9e2bfd31ac5fb15\` ON \`role_permissions\``);
    await queryRunner.query(`DROP TABLE \`role_permissions\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_e77c25aaad297ba331155532fa\` ON \`permissions\``);
    await queryRunner.query(`DROP INDEX \`IDX_4be56d0cb4f14292b2b5942d3b\` ON \`permissions\``);
    await queryRunner.query(`DROP TABLE \`permissions\``);
    await queryRunner.query(`DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
