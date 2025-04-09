import { Profile } from "../../domain/entities/profile.js";
import { PasswordEncrypter } from "../../domain/services/password-encrypter.ts";
import { QUEUE_NAMES } from "../../shared/constants.js";

type Dependencies = {
  profileRepository: any;
  queueService: any;
  passwordEncrypter: PasswordEncrypter;
};

type Params = {
  email: string;
  username: string;
  password: string;
};

class CreateProfile {
  private readonly _profileRepository: any;
  private readonly _queueService: any;
  private readonly passwordEncrypter: PasswordEncrypter;

  constructor({
    profileRepository,
    queueService,
    passwordEncrypter,
  }: Dependencies) {
    this._profileRepository = profileRepository;
    this._queueService = queueService;
    this.passwordEncrypter = passwordEncrypter;
  }

  async execute({ email, username, password }: Params) {
    const profileId = this._profileRepository.generateNextId();
    const profile = Profile.create({
      id: profileId,
      email,
      username,
      passwordHash: this.passwordEncrypter.encrypt(password),
    });

    await this._profileRepository.create(profile);

    await this._enqueueWelcomeMail(profile);

    return profile;
  }

  async _enqueueWelcomeMail(profile: Profile.Type) {
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
