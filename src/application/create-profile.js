import { Profile } from "../domain/profile.js";
import { QUEUE_NAMES } from "../shared/constants.js";

class CreateProfile {
  constructor({ profileRepository, queueService }) {
    this._profileRepository = profileRepository;
    this._queueService = queueService;
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

    await this._enqueueWelcomeMail(profile);

    return profile;
  }

  async _enqueueWelcomeMail(profile) {
    await this._queueService.enqueue(
      QUEUE_NAMES.SEND_MAIL,
      `send-mail - ${profile.email}`,
      {
        from: "no-reply@nodeapp.com",
        to: profile.email,
        subject: "Welcome to Node.js Example!",
        text: `Hello, ${profile.username}!\n\nYour account was successfully registered!`,
      }
    );
  }
}

export { CreateProfile };
