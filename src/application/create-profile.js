import { Profile } from "../domain/profile.js";

class CreateProfile {
  constructor({ profileRepository }) {
    this._profileRepository = profileRepository;
  }

  async execute({ email, username, password }) {
    const id = this._profileRepository.generateNextId();

    const profile = new Profile({
      id,
      email,
      username,
      passwordHash: password.hash,
      salt: password.salt,
    });

    await this._profileRepository.create(profile);

    // schedule email

    return profile;
  }
}

export { CreateProfile };
