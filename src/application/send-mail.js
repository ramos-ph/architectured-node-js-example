class SendMail {
  constructor({ mailerClient }) {
    this._mailerClient = mailerClient;
  }

  async execute(mail) {
    await this._mailerClient.sendMail(mail);
  }
}

export { SendMail };
