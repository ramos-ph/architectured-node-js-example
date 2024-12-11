import nodemailer from "nodemailer";

class NodemailerMailerClient {
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

  async sendMail(mail) {
    this._transporter.sendMail({
      from: "tigrinho@mail.com",
      ...mail,
    });
  }
}

export { NodemailerMailerClient };
