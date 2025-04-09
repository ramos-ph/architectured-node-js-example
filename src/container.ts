import { makeCreateProfile } from "./application/use-cases/create-profile.js";
import { PBKDF2PasswordEncrypter } from "./infrastructure/services/pbkdf2-password-encrypter.ts";
import { NodemailerMailerService } from "./infrastructure/mailers/nodemailer-mailer-service.js";
import { SendMail } from "./application/use-cases/send-mail.js";
import { BullMQQueueService } from "./infrastructure/bullmq-queue-service.js";
import { makeDatabase } from "./infrastructure/database/database.ts";
import { makeProfileRepositoryKnex } from "./infrastructure/repositories/profile-repository-knex.ts";

const database = makeDatabase();

const queueService = new BullMQQueueService({
  connection: { host: "localhost", port: 6379 },
});

const nodemailerMailerService = new NodemailerMailerService();
const passwordEncrypter = new PBKDF2PasswordEncrypter();
const profileRepository = makeProfileRepositoryKnex(database.knex);

const createProfile = makeCreateProfile({
  profileRepository,
  queueService,
  passwordEncrypter,
});

const sendMail = new SendMail({ mailerService: nodemailerMailerService });

const container = {
  database: database,
  queueService: queueService,
  profileRepository: profileRepository,
  createProfile: createProfile,
  passwordEncrypter: passwordEncrypter,
  sendMail: sendMail,
};

type Container = typeof container;

export { container, type Container };
