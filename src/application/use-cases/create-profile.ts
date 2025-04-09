import { Profile } from "../../domain/entities/profile.js";
import { ProfileRepository } from "../../domain/repositories/profile-repository.ts";
import { PasswordEncrypter } from "../../domain/services/password-encrypter.ts";
import { QueueService } from "../../domain/services/queue-service.ts";
import { QUEUE_NAMES } from "../../shared/constants.js";

type Dependencies = {
  profileRepository: ProfileRepository;
  queueService: QueueService;
  passwordEncrypter: PasswordEncrypter;
};

type Params = {
  email: string;
  username: string;
  password: string;
};

class CreateProfile {
  private readonly profileRepository: ProfileRepository;
  private readonly queueService: QueueService;
  private readonly passwordEncrypter: PasswordEncrypter;

  constructor({
    profileRepository,
    queueService,
    passwordEncrypter,
  }: Dependencies) {
    this.profileRepository = profileRepository;
    this.queueService = queueService;
    this.passwordEncrypter = passwordEncrypter;
  }

  async execute({ email, username, password }: Params) {
    const profileId = this.profileRepository.generateNextId();
    const profile = Profile.create({
      id: profileId,
      email,
      username,
      passwordHash: this.passwordEncrypter.encrypt(password),
    });

    await this.profileRepository.create(profile);

    await this.enqueueWelcomeMail(profile);

    return profile;
  }

  async enqueueWelcomeMail(profile: Profile.Type) {
    await this.queueService.enqueue(
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
