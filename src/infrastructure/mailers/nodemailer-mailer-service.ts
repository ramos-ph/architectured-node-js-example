import nodemailer from "nodemailer";
import { MailerService } from "../domain/mailerService.js";
import { Mail } from "../../domain/entities/mail.js";

class NodemailerMailerService implements MailerService {
  private readonly _transporter: nodemailer.Transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  async sendMail(mail: Mail.Type) {
    this._transporter.sendMail(mail);
  }
}

export { NodemailerMailerService };
