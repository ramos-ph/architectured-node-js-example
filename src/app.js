import "dotenv/config";
import express from "express";
import { Worker } from "bullmq";

import { Router } from "./interface/http/router.js";
import { container } from "./container.js";
import { EmailWorker } from "./interface/workers/email-worker.js";

class Application {
  constructor() {
    this._app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeWorkers();
  }

  initializeMiddlewares() {
    this._app.use(express.json());
    this._app.use((req, _res, next) => {
      req.container = container;
      next();
    });
  }

  initializeRoutes() {
    this._app.use("/api", Router.initialize());
  }

  initializeWorkers() {
    new Worker("email", EmailWorker.sendWelcomeMail, {
      connection: { host: "localhost", port: 6379 },
    });
  }

  get app() {
    return this._app;
  }
}

const app = new Application().app;

export { app };
