import express from "express";

import * as ProfileController from "../controllers/profiles-controller/index.js";

class ProfileRouter {
  static initialize() {
    const router = express.Router();

    router.post("/", ProfileController.create);

    return router;
  }
}

export { ProfileRouter };
