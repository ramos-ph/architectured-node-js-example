import "dotenv/config";
import express from "express";

import { Router } from "../interface/http/router.js";
import { container } from "../container.js";
import { QUEUE_NAMES } from "../shared/constants.js";
import { EmailWorker } from "../interface/workers/email-worker.js";
import { BullBoard } from "./bull-board.js";

class Application {
  constructor() {
    this._app = express();
    this._initializeMiddlewares();
    this._initializeRoutes();
    this._initializeWorkers();
    this._initializeBullBoard();
  }

  _initializeMiddlewares() {
    this._app.use(express.json());
    this._app.use((req, _res, next) => {
      req.container = container;
      next();
    });
  }

  _initializeRoutes() {
    this._app.use("/api", Router.initialize());
  }

  _initializeWorkers() {
    container.queueService.addWorker(
      QUEUE_NAMES.SEND_MAIL,
      EmailWorker.process
    );
  }

  _initializeBullBoard() {
    this._app.use("/admin/queues", BullBoard.initialize());
  }

  get app() {
    return this._app;
  }
}

const app = new Application().app;

export { app };
