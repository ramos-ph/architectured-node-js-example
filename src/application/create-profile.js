import { Profile } from "../domain/profile.js";

class CreateProfile {
  constructor({ profileRepository }) {
    this._profileRepository = profileRepository;
  }

  async execute({ email, username, password }) {
    const profileId = this._profileRepository.generateNextId();
    const profile = Profile.create({
      id: profileId,
      email,
      username,
      passwordHash: password.hash,
      salt: password.salt,
    });

    await this._profileRepository.create(profile);

    // sendWelcomeMail

    return profile;
  }
}

export { CreateProfile };
