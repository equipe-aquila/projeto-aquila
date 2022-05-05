import { Express } from "express";
import { addFavoritoHandler, getPrestadoresHandler } from "./controller/PrestadorController";
import { getUsersHandler } from "./controller/UserController";

function routes(app: Express) {
  /**
   * @openapi
   * /api/users:
   *  get:
   *    tags:
   *    - Users
   *    description: Fetch all users
   *    responses:
   *      200:
   *        description: Succesfully fetched all users
   */
  app.get("/api/users", getUsersHandler);


  /**
   * @openapi
   * /api/prestadores:
   *  get:
   *    tags:
   *    - Prestadores
   *    description: Fetch all prestadores
   *    responses:
   *      200:
   *        description: Succesfully fetched all prestadores
   */
  app.get("/api/prestadores", getPrestadoresHandler);

  app.post("/api/prestadores/:id/addFavorito", addFavoritoHandler);
}

export default routes;
