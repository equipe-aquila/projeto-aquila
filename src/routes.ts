import { Express } from "express";
import { createAgendamentoHandler, getAgendamentoHandler, getAgendamentosByUserHandler } from "./controller/AgendamentoController";
import { addFavoritoHandler, getPrestadoresHandler } from "./controller/PrestadorController";
import { createUserHandler, deleteUserHandler, getUserHandler, getUsersHandler, updateUserHandler } from "./controller/UserController";

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

  app.get("/api/users/:id", getUserHandler);

  app.post("/api/users", createUserHandler);

  app.put("/api/users/:id", updateUserHandler);

  app.delete("/api/users/:id", deleteUserHandler);

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
  
  app.post("/api/agendamentos/:userId/agendar/:prestadorId", createAgendamentoHandler);
  app.get("/api/agendamentos/user/:id", getAgendamentosByUserHandler);
  app.get("/api/agendamentos/:id", getAgendamentoHandler);
}

export default routes;
