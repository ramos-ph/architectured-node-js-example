import { EmailQueue } from "../../domain/services/email-queue.ts";
import { QueueService } from "../../domain/services/queue-service.ts";
import { QUEUE_NAMES } from "../../shared/constants.ts";

type Dependencies = {
  queueService: QueueService;
};

export const makeBullMQEmailQueue = ({
  queueService,
}: Dependencies): EmailQueue => {
  return {
    async sendWelcomeMail(profile) {
      await queueService.enqueue(
        QUEUE_NAMES.SEND_MAIL,
        `send-mail - ${profile.email}`,
        {
          from: "no-reply@nodeapp.com",
          to: profile.email,
          subject: "Welcome to Node.js Example!",
          text: `Hello, ${profile.username}!\n\nYour account was successfully registered!`,
        }
      );
    },
  };
};
