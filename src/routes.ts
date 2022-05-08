import { Express } from "express";
import { createAgendamentoHandler, getAgendamentoHandler, getAgendamentosByUserHandler } from "./controller/AgendamentoController";
import { addFavoritoHandler, createAvalicaoHandler, getPrestadoresHandler } from "./controller/PrestadorController";
import { addMeioPagamentoHandler, createUserHandler, deleteUserHandler, getMeiosPagamentoHandler, getUserFavoritosHandler, getUserHandler, getUsersHandler, updateUserHandler } from "./controller/UserController";

export default (app: Express) => {
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
  app.get("/api/users/:id/favoritos", getUserFavoritosHandler);
  app.post("/api/users/:id/meio-pagamento", addMeioPagamentoHandler);
  app.get("/api/users/:id/meio-pagamento", getMeiosPagamentoHandler);


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
  app.post("/api/prestadores/:id/favorito", addFavoritoHandler);
  app.post("/api/prestadores/:id/avaliacao", createAvalicaoHandler);

  
  app.post("/api/agendamentos/:userId/agendar/:prestadorId", createAgendamentoHandler);
  app.get("/api/agendamentos/user/:id", getAgendamentosByUserHandler);
  app.get("/api/agendamentos/:id", getAgendamentoHandler);
}
