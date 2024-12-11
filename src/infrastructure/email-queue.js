class EmailQueue {
  _QUEUE_NAME = "email";

  constructor({ queueManager }) {
    this._queueManager = queueManager;
  }

  async add(name, job) {
    await this._queueManager.add(this._QUEUE_NAME, name, job);
  }
}

export { EmailQueue };
