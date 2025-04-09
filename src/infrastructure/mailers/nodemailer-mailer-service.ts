import nodemailer from "nodemailer";
import { MailerService } from "../../domain/services/mailer-service.ts";
import { Mail } from "../../domain/entities/mail.js";

const makeNodemailerMailerService = (): MailerService => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  return {
    async sendMail(mail) {
      await transporter.sendMail(mail);
    },
  };
};

export { makeNodemailerMailerService };
