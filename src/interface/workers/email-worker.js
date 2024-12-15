import { container } from "../../container.js";

class EmailWorker {
  static async process(job) {
    await container.sendMail.execute(job.data);
  }
}

export { EmailWorker };
