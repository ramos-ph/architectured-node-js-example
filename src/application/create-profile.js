import { Profile } from "../domain/profile.js";

class CreateProfile {
  constructor({ profileRepository, emailQueue }) {
    this._profileRepository = profileRepository;
    this._emailQueue = emailQueue;
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

    // await sendWelcomeMail?
    await this._emailQueue.add("welcome_mail", {
      to: email,
      subject: "Welcome to our platform!",
      text: "Your account was created!",
    });

    return profile;
  }
}

export { CreateProfile };
