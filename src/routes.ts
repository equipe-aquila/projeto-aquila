import { Express } from "express";
import { getUsersHandler } from "./controller/UserController";

function routes(app: Express) {
  app.get("/api/users", getUsersHandler);
}

export default routes;
