interface MailerService {
  sendMail(mail: {
    to: string;
    from: string;
    subject: string;
    text: string;
  }): Promise<void>;
}

export { MailerService };
