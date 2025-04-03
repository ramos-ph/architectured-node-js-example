import { Job } from "bullmq";
import { container } from "../../container.js";
import { Mail } from "../../domain/mail.js";

class EmailWorker {
  static async process(job: Job<Mail>) {
    await container.sendMail.execute(job.data);
  }
}

export { EmailWorker };
