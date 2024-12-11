import { Mail } from "../../domain/mail.js";
import { container } from "../../container.js";

class EmailWorker {
  static async process(job) {
    const mail = new Mail(job.data);
    await container.sendMail.execute(mail);
  }
}

export { EmailWorker };
