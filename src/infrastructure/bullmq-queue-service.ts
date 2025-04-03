import { Queue, Worker } from "bullmq";

class BullMQQueueService {
  private readonly _connection: { host: string; port: number };
  _queues = new Map();
  _workers = new Map();

  constructor({ connection }: { connection: { host: string; port: number } }) {
    this._connection = connection;
  }

  async enqueue(queueName: string, jobName: string, jobData: any) {
    const queue = this.getQueue(queueName);
    await queue.add(jobName, jobData);
  }

  getQueue(name: string) {
    if (!this._queues.has(name)) {
      const queue = new Queue(name, { connection: this._connection });
      this._queues.set(name, queue);
    }
    return this._queues.get(name);
  }

  addWorker(queueName: string, handler: any) {
    const worker = new Worker(queueName, handler, {
      connection: this._connection,
    });

    worker.on("error", (job) => {
      console.error(`[WORKERS] Job failed: ${job.message}`);
    });

    worker.on("failed", (job) => {
      console.error(`[WORKERS] Job failed: ${JSON.stringify(job)}`);
    });

    worker.on("completed", (job) => {
      console.log(`[WORKERS] Job ${job.id} completed.`);
    });

    this._workers.set(queueName, worker);
  }
}

export { BullMQQueueService };
