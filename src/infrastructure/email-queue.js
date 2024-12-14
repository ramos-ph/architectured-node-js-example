class EmailQueue {
  _QUEUE_NAME = "email";

  constructor({ queueService }) {
    this._queueService = queueService;
  }

  async add(name, job) {
    await this._queueService.add(this._QUEUE_NAME, name, job);
  }
}

export { EmailQueue };
