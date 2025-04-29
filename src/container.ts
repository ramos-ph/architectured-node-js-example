import { makeCreateProfile } from "./application/use-cases/create-profile.ts";
import { makePBKDF2PasswordEncrypter } from "./infrastructure/services/pbkdf2-password-encrypter.ts";
import { makeNodemailerMailerService } from "./infrastructure/mailers/nodemailer-mailer-service.ts";
import { makeBullMQQueueService } from "./infrastructure/services/bullmq-queue-service.ts";
import { makeDatabase } from "./infrastructure/database/database.ts";
import { makeProfileRepositoryKnex } from "./infrastructure/repositories/profile-repository-knex.ts";
import { makeBullMQEmailQueue } from "./infrastructure/services/bullmq-email-queue.ts";

const database = makeDatabase();

const queueService = makeBullMQQueueService({
  connection: { host: "localhost", port: 6379 },
});
const emailQueue = makeBullMQEmailQueue({ queueService });

const mailerService = makeNodemailerMailerService();
const passwordEncrypter = makePBKDF2PasswordEncrypter();
const profileRepository = makeProfileRepositoryKnex(database.knex);

const createProfile = makeCreateProfile({
  profileRepository,
  emailQueue,
  passwordEncrypter,
});

const container = {
  database: database,
  queueService: queueService,
  profileRepository: profileRepository,
  createProfile: createProfile,
  passwordEncrypter: passwordEncrypter,
  mailerService: mailerService,
  emailQueue: emailQueue,
};

type Container = typeof container;

export { container, type Container };
