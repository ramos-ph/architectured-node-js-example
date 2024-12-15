import { container } from "../../container.js";

export const emailWorker = async (job) => {
  await container.sendMail.execute(job.data);
};
