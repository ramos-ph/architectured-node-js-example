import { Mail } from "../entities/mail.js";

interface MailerService {
  sendMail(mail: Mail.Type): Promise<void>;
}

export { MailerService };
