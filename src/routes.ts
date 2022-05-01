import { Express } from "express";
import { getPrestadoresHandler } from "./controller/PrestadorController";
import { getUsersHandler } from "./controller/UserController";

function routes(app: Express) {
  app.get("/api/users", getUsersHandler);
  
  app.get("/api/prestadores", getPrestadoresHandler);
}

export default routes;
