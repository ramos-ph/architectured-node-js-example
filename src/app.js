import express from "express";

import { Router } from "./interface/http/router.js";
import { container } from "./container.js";

class Application {
  constructor() {
    this._app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
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

  get app() {
    return this._app;
  }
}

const app = new Application().app;

export { app };
