import { Queue } from "bullmq";

class BullMQQueueService {
  constructor({ connection }) {
    this._connection = connection;
    this._queues = new Map();
  }

  async add(queueName, jobName, jobData) {
    const queue = this._getQueue(queueName);
    await queue.add(jobName, jobData);
  }

  _getQueue(name) {
    if (!this._queues.has(name)) {
      const queue = new Queue(name, { connection: this._connection });
      this._queues.set(name, queue);
    }
    return this._queues.get(name);
  }
}

export { BullMQQueueService };
