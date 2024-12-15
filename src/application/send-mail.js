import { Mail } from "../domain/mail";

class SendMail {
  constructor({ mailerService }) {
    this._mailerService = mailerService;
  }

  async execute({ to, from, subject, text }) {
    const mail = Mail.create({ to, from, subject, text });

    await this._mailerService.sendMail(mail);
  }
}

export { SendMail };
