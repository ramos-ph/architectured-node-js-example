import { Queue, Worker } from "bullmq";
import { QueueService } from "../../domain/services/queue-service.ts";

const makeBullMQQueueService = ({
  connection,
}: {
  connection: { host: string; port: number };
}): QueueService<Queue> => {
  const queues = new Map<string, Queue>();
  const workers = new Map<string, Worker>();

  return {
    async enqueue<T>(queueName: string, jobName: string, jobData: T) {
      const queue = this.getQueue(queueName);
      await queue.add(jobName, jobData);
    },

    getQueue(name: string): Queue {
      if (!queues.has(name)) {
        const queue = new Queue(name, { connection });
        queues.set(name, queue);
      }
      return queues.get(name)!;
    },

    addWorker(queueName: string, handler: any) {
      const worker = new Worker(queueName, handler, { connection });

      worker.on("error", (job) => {
        console.error(`[WORKERS] Job failed: ${job.message}`);
      });

      worker.on("failed", (job) => {
        console.error(`[WORKERS] Job failed: ${JSON.stringify(job)}`);
      });

      worker.on("completed", (job) => {
        console.log(`[WORKERS] Job ${job.id} completed.`);
      });

      workers.set(queueName, worker);
    },
  };
};

export { makeBullMQQueueService };
