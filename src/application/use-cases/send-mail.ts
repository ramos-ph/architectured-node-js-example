import { MailerService } from "../../domain/services/mailer-service.ts";

type Dependencies = {
  mailerService: MailerService;
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
    await mailerService.sendMail({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
    });
  };
};

export { makeSendMail };
