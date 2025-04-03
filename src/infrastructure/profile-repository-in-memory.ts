import crypto from "crypto";
import { Profile } from "../domain/profile.js";

class ProfileRepositoryInMemory {
  private readonly _profiles: Profile.Type[];

  constructor() {
    this._profiles = [];
  }

  generateNextId() {
    return crypto.randomUUID();
  }

  async create(profile: Profile.Type) {
    this._profiles.push(profile);
  }
}

export { ProfileRepositoryInMemory };
