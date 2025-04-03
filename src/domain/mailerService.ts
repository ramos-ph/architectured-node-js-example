import { Mail } from "./mail.js";

interface MailerService {
  sendMail(mail: Mail): Promise<void>;
}

export { MailerService };
