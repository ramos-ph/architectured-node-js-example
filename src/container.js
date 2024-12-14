import { ProfileRepositoryInMemory } from "./infrastructure/profile-repository-in-memory.js";
import { CreateProfile } from "./application/create-profile.js";
import { PBKDF2PasswordHasher } from "./infrastructure/pbkdf2-password-hasher.js";
import { NodemailerMailerService } from "./infrastructure/nodemailer-mailer-client.js";
import { SendMail } from "./application/send-mail.js";
import { BullMQQueueManager } from "./infrastructure/bullmq-enqueuer.js";
import { EmailQueue } from "./infrastructure/email-queue.js";

const bullMqQueueManager = new BullMQQueueManager({
  connection: { host: "localhost", port: 6379 },
});
const nodemailerMailerService = new NodemailerMailerService();
const pbkdf2PasswordHasher = new PBKDF2PasswordHasher();
const profileRepository = new ProfileRepositoryInMemory();

const emailQueue = new EmailQueue({ queueManager: bullMqQueueManager });
const createProfile = new CreateProfile({ profileRepository, emailQueue });
const sendMail = new SendMail({ mailerClient: nodemailerMailerService });

const container = {
  profileRepository: profileRepository,
  createProfile: createProfile,
  pbkdf2PasswordHasher: pbkdf2PasswordHasher,
  sendMail: sendMail,
};

export { container };
