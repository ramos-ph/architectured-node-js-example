namespace Mail {
  export type Type = {
    to: string;
    from: string;
    subject: string;
    text: string;
  };

  export type CreateProps = {
    to: string;
    from: string;
    subject: string;
    text: string;
  };

  export const create = (data: CreateProps): Type => {
    return {
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
    };
  };
}

export { Mail };
