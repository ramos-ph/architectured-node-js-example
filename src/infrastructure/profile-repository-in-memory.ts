import crypto from "crypto";
import { Profile } from "../domain/profile.js";

class ProfileRepositoryInMemory {
  private readonly _profiles: Profile[];

  constructor() {
    this._profiles = [];
  }

  generateNextId() {
    return crypto.randomUUID();
  }

  async create(profile: Profile) {
    this._profiles.push(profile);
  }
}

export { ProfileRepositoryInMemory };
