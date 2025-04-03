import express from "express";

import { ProfileRouter } from "./routes/profile-router.js";

class Router {
  static initialize() {
    const router = express.Router();

    router.use("/profiles", ProfileRouter.initialize());

    return router;
  }
}

export { Router };
