import { ProfileRepositoryInMemory } from "./infrastructure/profile-repository-in-memory.js";
import { CreateProfile } from "./application/create-profile.js";
import { PBKDF2PasswordHasher } from "./infrastructure/pbkdf2-password-hasher.js";
import { NodemailerMailerService } from "./infrastructure/nodemailer-mailer-client.js";
import { SendMail } from "./application/send-mail.js";
import { BullMQQueueService } from "./infrastructure/bullmq-queue-service.js";

const bullMqQueueService = new BullMQQueueService({
  connection: { host: "localhost", port: 6379 },
});
const nodemailerMailerService = new NodemailerMailerService();
const pbkdf2PasswordHasher = new PBKDF2PasswordHasher();
const profileRepository = new ProfileRepositoryInMemory();

const createProfile = new CreateProfile({ profileRepository });
const sendMail = new SendMail({ mailerClient: nodemailerMailerService });

const container = {
  profileRepository: profileRepository,
  createProfile: createProfile,
  pbkdf2PasswordHasher: pbkdf2PasswordHasher,
  sendMail: sendMail,
};

export { container };
