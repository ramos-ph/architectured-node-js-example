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
    const worker = new Worker("email", EmailWorker.process, {
      connection: { host: "localhost", port: 6379 },
    });

    worker.on("completed", (job) => {
      console.log(`[worker] Job ${job.id} completed.`);
    });
  }

  get app() {
    return this._app;
  }
}

const app = new Application().app;

export { app };
