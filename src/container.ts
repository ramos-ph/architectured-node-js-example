import { ProfileRepositoryInMemory } from "./infrastructure/repositories/profile-repository-in-memory.js";
import { CreateProfile } from "./application/use-cases/create-profile.js";
import { PBKDF2PasswordHasher } from "./infrastructure/pbkdf2-password-hasher.js";
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
const pbkdf2PasswordHasher = new PBKDF2PasswordHasher();
const profileRepository = makeProfileRepositoryKnex(database.knex);

const createProfile = new CreateProfile({ profileRepository, queueService });
const sendMail = new SendMail({ mailerService: nodemailerMailerService });

const container = {
  database: database,
  queueService: queueService,
  profileRepository: profileRepository,
  createProfile: createProfile,
  pbkdf2PasswordHasher: pbkdf2PasswordHasher,
  sendMail: sendMail,
};

type Container = typeof container;

export { container, type Container };
