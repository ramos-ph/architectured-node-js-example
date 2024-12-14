class SendMail {
  constructor({ mailerService }) {
    this._mailerService = mailerService;
  }

  async execute(mail) {
    await this._mailerService.sendMail(mail);
  }
}

export { SendMail };
