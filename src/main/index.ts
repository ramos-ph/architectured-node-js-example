import "dotenv/config";
import { app } from "./app.ts";
import { container } from "../container.ts";

const main = async () => {
  await container.database.connect();

  app.listen(3000);
};

main();
