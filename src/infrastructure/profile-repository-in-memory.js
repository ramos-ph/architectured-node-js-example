import crypto from "crypto";

class ProfileRepositoryInMemory {
  constructor() {
    this._profiles = [];
  }

  generateNextId() {
    return crypto.randomUUID();
  }

  async create(profile) {
    this._profiles.push(profile);
  }
}

export { ProfileRepositoryInMemory };
