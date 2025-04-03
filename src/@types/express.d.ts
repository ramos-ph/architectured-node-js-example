import { type Container } from "../container.ts";

declare global {
  namespace Express {
    export interface Request {
      container: Container;
    }
  }
}
