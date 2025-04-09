import { Profile } from "../../domain/entities/profile.ts";
import { ProfileRepository } from "../../domain/repositories/profile-repository.ts";
import { PasswordEncrypter } from "../../domain/services/password-encrypter.ts";
import { QueueService } from "../../domain/services/queue-service.ts";
import { QUEUE_NAMES } from "../../shared/constants.ts";

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

const makeCreateProfile = (dependencies: Dependencies) => {
  const { profileRepository, queueService, passwordEncrypter } = dependencies;

  const enqueueWelcomeMail = async (profile: Profile.Type) => {
    await queueService.enqueue(
      QUEUE_NAMES.SEND_MAIL,
      `send-mail - ${profile.email}`,
      {
        from: "no-reply@nodeapp.com",
        to: profile.email,
        subject: "Welcome to Node.js Example!",
        text: `Hello, ${profile.username}!\n\nYour account was successfully registered!`,
      }
    );
  };

  return async (params: Params) => {
    const profileId = profileRepository.generateNextId();
    const profile = Profile.create({
      id: profileId,
      email: params.email,
      username: params.username,
      passwordHash: passwordEncrypter.encrypt(params.password),
    });

    await profileRepository.create(profile);

    await enqueueWelcomeMail(profile);

    return profile;
  };
};

export { makeCreateProfile };
