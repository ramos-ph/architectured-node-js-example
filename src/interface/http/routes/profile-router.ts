import express from "express";

import { ProfileController } from "../controllers/profiles-controller.js";

class ProfileRouter {
  static initialize() {
    const router = express.Router();

    router.post("/", ProfileController.create);

    return router;
  }
}

export { ProfileRouter };
