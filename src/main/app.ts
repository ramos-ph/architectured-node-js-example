import express from "express";

import { Router } from "../interface/http/router.ts";
import { container } from "../container.ts";
import { QUEUE_NAMES } from "../shared/constants.ts";
import { EmailWorker } from "../interface/workers/email-worker.ts";
import { BullBoard } from "./bull-board.ts";

class Application {
  private _app: express.Application;

  constructor() {
    this._app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeWorkers();
    this.initializeBullBoard();
  }

  private initializeMiddlewares() {
    this._app.use(express.json());
    this._app.use((req, _res, next) => {
      req.container = container;
      next();
    });
  }

  private initializeRoutes() {
    this._app.use("/api", Router.initialize());
  }

  private initializeWorkers() {
    container.queueService.addWorker(
      QUEUE_NAMES.SEND_MAIL,
      EmailWorker.process
    );
  }

  private initializeBullBoard() {
    this._app.use("/admin/queues", BullBoard.initialize());
  }

  get app() {
    return this._app;
  }
}

const app = new Application().app;

export { app };
