import { Knex } from "knex";
import { ProfileRepository } from "../../domain/repositories/profile-repository.ts";

const makeProfileRepositoryKnex = (knex: Knex): ProfileRepository => {
  return {
    generateNextId() {
      return crypto.randomUUID();
    },

    async create(profile) {
      await knex("profiles").insert(profile);
    },
  };
};

export { makeProfileRepositoryKnex };
