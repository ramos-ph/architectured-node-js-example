class Mail {
  constructor({ to, from, subject, text }) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
  }

  static create(data) {
    return new Mail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
    });
  }
}

export { Mail };
