interface QueueService {
  enqueue: <T>(queueName: string, jobName: string, jobData: T) => Promise<void>;
  getQueue: (queueName: string) => unknown;
  addWorker: (queueName: string, handler: any) => void;
}

export { QueueService };
