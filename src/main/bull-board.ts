import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";

import { container } from "../container.js";
import { QUEUE_NAMES } from "../shared/constants.js";

class BullBoard {
  static initialize() {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/admin/queues");

    createBullBoard({
      queues: Object.values(QUEUE_NAMES).map(
        (queueName) =>
          new BullMQAdapter(container.queueService.getQueue(queueName))
      ),
      serverAdapter,
    });

    return serverAdapter.getRouter();
  }
}

export { BullBoard };
