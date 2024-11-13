import { MigrationInterface, QueryRunner } from 'typeorm';

/* NOTE password K12345678k! */

export class CreateSeed1731017805188 implements MigrationInterface {
  name = 'CreateSeed1731017805188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (email, "firstName", "lastName", password) VALUES 
      ('john@mail.com', 'John', 'Snow', '$2b$10$XWfHvcYBtcynMXzxQKbppegs0eYojERAi4KQUIEkCgk1GxxZIesu2'), 
      ('alice@mail.com', 'Alice', 'Johnson', '$2b$10$XWfHvcYBtcynMXzxQKbppegs0eYojERAi4KQUIEkCgk1GxxZIesu2'), 
      ('bob@mail.com', 'Bob', 'Smith', '$2b$10$XWfHvcYBtcynMXzxQKbppegs0eYojERAi4KQUIEkCgk1GxxZIesu2'), 
      ('max@mail.com', 'Max', 'Brown', '$2b$10$XWfHvcYBtcynMXzxQKbppegs0eYojERAi4KQUIEkCgk1GxxZIesu2')
      RETURNING id;`,
    );
  }

  public async down(): Promise<void> {}
}
