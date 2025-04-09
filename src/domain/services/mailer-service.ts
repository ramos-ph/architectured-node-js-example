import { Mail } from "../entities/mail.ts";

interface MailerService {
  sendMail(mail: Mail.Type): Promise<void>;
}

export { MailerService };
