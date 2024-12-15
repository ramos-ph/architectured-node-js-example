import { container } from "../../container.js";

class EmailWorker {
  static async sendWelcomeMail(job) {
    await container.sendMail.execute(job.data);
  }
}

export { EmailWorker };
