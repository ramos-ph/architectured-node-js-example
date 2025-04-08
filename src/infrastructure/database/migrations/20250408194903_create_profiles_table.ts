import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("profiles", (t) => {
    t.string("id").primary();
    t.string("username").notNullable();
    t.string("email").notNullable().unique();
    t.string("passwordHash").notNullable();
    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("profiles");
}
