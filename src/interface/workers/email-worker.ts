import { Job } from "bullmq";
import { container } from "../../container.ts";
import { Mail } from "../../domain/entities/mail.ts";

class EmailWorker {
  static async process(job: Job<Mail.Type>) {
    await container.sendMail(job.data);
  }
}

export { EmailWorker };
