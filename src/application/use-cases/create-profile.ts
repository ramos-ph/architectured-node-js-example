import { Profile } from "../../domain/entities/profile.ts";
import { ProfileRepository } from "../../domain/repositories/profile-repository.ts";
import { EmailQueue } from "../../domain/services/email-queue.ts";
import { PasswordEncrypter } from "../../domain/services/password-encrypter.ts";
import { QueueService } from "../../domain/services/queue-service.ts";
import { QUEUE_NAMES } from "../../shared/constants.ts";

type Dependencies = {
  profileRepository: ProfileRepository;
  emailQueue: EmailQueue;
  passwordEncrypter: PasswordEncrypter;
};

type Params = {
  email: string;
  username: string;
  password: string;
};

const makeCreateProfile = (dependencies: Dependencies) => {
  const { profileRepository, emailQueue, passwordEncrypter } = dependencies;

  return async (params: Params) => {
    const profileId = profileRepository.generateNextId();
    const profile = Profile.create({
      id: profileId,
      email: params.email,
      username: params.username,
      passwordHash: passwordEncrypter.encrypt(params.password),
    });

    await profileRepository.create(profile);

    await emailQueue.sendWelcomeMail(profile);

    return profile;
  };
};

export { makeCreateProfile };
