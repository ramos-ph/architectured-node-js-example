import { Job } from "bullmq";
import { container } from "../../container.ts";

class EmailWorker {
  static async process(job: Job) {
    await container.sendMail(job.data);
  }
}

export { EmailWorker };
