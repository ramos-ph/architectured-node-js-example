interface QueueService<TQueue = unknown> {
  enqueue: <T>(queueName: string, jobName: string, jobData: T) => Promise<void>;
  getQueue: (queueName: string) => TQueue;
  addWorker: (queueName: string, handler: any) => void;
}

export { QueueService };
