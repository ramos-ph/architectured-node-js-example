type CreateProps = {
  to: string;
  from: string;
  subject: string;
  text: string;
};

class Mail {
  public readonly to: string;
  public readonly from: string;
  public readonly subject: string;
  public readonly text: string;

  constructor({ to, from, subject, text }: CreateProps) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
  }

  static create(data: CreateProps) {
    return new Mail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
    });
  }
}

export { Mail };
