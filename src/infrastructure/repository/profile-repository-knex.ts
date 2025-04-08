import { ProfileRepository } from "../../domain/repositories/profile-repository.ts";

const makeProfileRepositoryKnex = (): ProfileRepository => {
  return {
    generateNextId() {
      return crypto.randomUUID();
    },

    async create(profile) {
      throw new Error("Not implemented");
    },
  };
};

export { makeProfileRepositoryKnex };
