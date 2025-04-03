import nodemailer from "nodemailer";

class NodemailerMailerService {
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

  async sendMail(mail: any) {
    this._transporter.sendMail(mail);
  }
}

export { NodemailerMailerService };
