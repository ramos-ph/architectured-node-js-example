import { Mail } from "../../domain/mail.js";

type Dependencies = {
  mailerService: any;
};

type Params = {
  to: string;
  from: string;
  subject: string;
  text: string;
};

class SendMail {
  private readonly _mailerService: any;

  constructor({ mailerService }: Dependencies) {
    this._mailerService = mailerService;
  }

  async execute({ to, from, subject, text }: Params) {
    const mail = Mail.create({ to, from, subject, text });

    await this._mailerService.sendMail(mail);
  }
}

export { SendMail };
