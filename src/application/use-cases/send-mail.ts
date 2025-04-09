import { Mail } from "../../domain/entities/mail.ts";

type Dependencies = {
  mailerService: any;
};

type Params = {
  to: string;
  from: string;
  subject: string;
  text: string;
};

const makeSendMail = (dependencies: Dependencies) => {
  const { mailerService } = dependencies;

  return async (params: Params) => {
    const mail = Mail.create({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
    });

    await mailerService.sendMail(mail);
  };
};

export { makeSendMail };
