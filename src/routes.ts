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

  /**
   * @openapi
   * '/api/users/{id}':
   *  get:
   *     tags:
   *     - Users
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserResponse'
   *       404:
   *         description: User not found
   */
  app.get("/api/users/:id", getUserHandler);

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - Users
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      201:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", createUserHandler);


  /**
   * @openapi
   * '/api/users/{id}':
   *  put:
   *     tags:
   *     - Users
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateUserInput'
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserResponse'
   *       404:
   *         description: User not found
   */
  app.put("/api/users/:id", updateUserHandler);


  /**
   * @openapi
   * '/api/users/{id}':
   *  delete:
   *     tags:
   *     - Users
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: User not found
   */
  app.delete("/api/users/:id", deleteUserHandler);


  /**
   * @openapi
   * '/api/users/{id}/favoritos':
   *  get:
   *     tags:
   *     - Users
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              type: array
   *              $ref: '#/components/schemas/PrestadorResponse'
   *       404:
   *         description: User not found
   */
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
   *              
   */
  app.get("/api/prestadores", getPrestadoresHandler);

  /**
   * @openapi
   * '/api/prestadores/{id}/favorito':
   *  post:
   *     tags:
   *     - Prestadores
   *     requestBody:
   *      required: true
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do prestador
   *     responses:
   *      201:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/prestadores/:id/favorito", addFavoritoHandler);

  /**
   * @openapi
   * '/api/prestadores/{id}/avaliacao':
   *  post:
   *     tags:
   *     - Prestadores
   *     requestBody:
   *      required: true
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do prestador
   *     responses:
   *      201:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/prestadores/:id/avaliacao", createAvalicaoHandler);


  /**
   * @openapi
   * '/api/agendamentos/{userId}/agendar/{prestadorId}':
   *  post:
   *     tags:
   *     - Agendamentos
   *     requestBody:
   *      required: true
   *     parameters:
   *      - name: userId
   *        in: path
   *        description: O id do usuário
   *      - name: prestadorId
   *        in: path
   *        description: O id do prestador
   *     responses:
   *      201:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/agendamentos/:userId/agendar/:prestadorId", createAgendamentoHandler);

  /**
   * @openapi
   * /api/agendamentos/user/{id}:
   *  get:
   *    tags:
   *    - Agendamentos
   *    parameters:
   *      - name: id
   *        in: path
   *        description: O id do usuário
   *        required: true
   *    responses:
   *      200:
   *        description: Success
   */
  app.get("/api/agendamentos/user/:id", getAgendamentosByUserHandler);

  /**
   * @openapi
   * /api/agendamentos/{id}:
   *  get:
   *    tags:
   *    - Agendamentos
   *    parameters:
   *      - name: id
   *        in: path
   *        description: O id do agendamento
   *        required: true
   *    responses:
   *      200:
   *        description: Sucesso
   */
  app.get("/api/agendamentos/:id", getAgendamentoHandler);
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name

 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *    UserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 * 
 *    UpdateUserInput:
 *      type: object
 *      required:
 *        []
 * 
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 * 
 *    PrestadorResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
  *    CreatePrestadorInput:
 *      type: object
 *      required:
 *        - email
 *        - name

 *      properties:
 *        email:
 *          type: string
 *          default: jhon.doe@example.com
 *        name:
 *          type: string
 *          default: John Doe
 */
