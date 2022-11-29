import { Express } from "express";
import {
  createAgendamentoHandler,
  deleteAgendamentoHandler,
  getAgendamentoHandler,
  getAgendamentosByPrestadorHandler,
  getAgendamentosByUserHandler,
  updateAgendamentoHandler,
} from "./controller/AgendamentoController";
import {
  createPaymentIntent,
} from "./controller/PagamentosController";
import {
  createAvalicaoHandler,
  createPrestadorHandler,
  deletePrestadorHandler,
  getPrestadorColaboradoresHandler,
  getPrestadoresHandler,
  getPrestadorHandler,
  getPrestadorServicosHandler,
  updatePrestadorHandler,
} from "./controller/PrestadorController";
import {
  createServicosHandler,
  deleteServicosHandler,
  getServicoHandler,
  getServicosHandler,
  updateServicosHandler,
} from "./controller/ServicoController";
import {
  addFavoritoHandler,
  addMeioPagamentoHandler,
  createUserHandler,
  deleteFavoritoHandler,
  deleteUserHandler,
  getMeiosPagamentoHandler,
  getUserFavoritosHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "./controller/UserController";
import {
  getColaboradorHandler,
  getColaboradoresHandler,
  createColaboradorHandler,
  updateColaboradorHandler,
  deleteColaboradorHandler,
  getColaboradorAgendamentosHandler,
} from "./controller/ColaboradorController";

export default (app: Express) => {
  /**
   * @openapi
   * /api/users:
   *  get:
   *    tags:
   *    - Usuário
   *    description: Obter todos os usuários
   *    responses:
   *      200:
   *        description: Sucesso
   */
  app.get("/api/users", getUsersHandler);

  /**
   * @openapi
   * '/api/users/{id}':
   *  get:
   *     tags:
   *     - Usuário
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id usuário
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserResponse'
   *       404:
   *         description: Usuário não encontrado
   */
  app.get("/api/users/:id", getUserHandler);

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - Usuário
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      201:
   *        description: Sucesso
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserResponse'
   *      409:
   *        description: Conflito
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", createUserHandler);

  /**
   * @openapi
   * '/api/users/{id}':
   *  put:
   *     tags:
   *     - Usuário
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateUserInput'
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do usário
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserResponse'
   *       404:
   *         description: Usuário não encontrado
   */
  app.put("/api/users/:id", updateUserHandler);

  /**
   * @openapi
   * '/api/users/{id}':
   *  delete:
   *     tags:
   *     - Usuário
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do usuário
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Usuário não encontrado
   */
  app.delete("/api/users/:id", deleteUserHandler);

  /**
   * @openapi
   * '/api/users/{id}/favoritos':
   *  get:
   *     tags:
   *     - Usuário
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do usuário
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *         content:
   *          application/json:
   *           schema:
   *              type: array
   *              $ref: '#/components/schemas/PrestadorResponse'
   *       404:
   *         description: Usuário não encontrado
   */
  app.get("/api/users/:id/favoritos", getUserFavoritosHandler);

  /**
   * @openapi
   * '/api/users/{id}/favoritos':
   *  post:
   *     tags:
   *     - Usuário
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do usuário
   *     requestBody:
   *      required: true
   *     responses:
   *      201:
   *        description: Sucesso
   *      409:
   *        description: Conflito
   *      400:
   *        description: Bad request
   */
  app.post("/api/users/:id/favoritos", addFavoritoHandler);

  /**
   * @openapi
   * '/api/users/{id}/favoritos':
   *  delete:
   *     tags:
   *     - Usuário
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do usuário
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Usuário não encontrado
   */
  app.delete("/api/users/:id/favoritos", deleteFavoritoHandler);

  /**
   * @openapi
   * '/api/users/{id}/meio-pagamento':
   *  post:
   *     tags:
   *     - Usuário
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do usuário
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateMeioPagamentoInput'
   *     responses:
   *      201:
   *        description: Sucesso
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/MeioPagamentoResponse'
   *      409:
   *        description: Conflito
   *      400:
   *        description: Bad request
   */
  app.post("/api/users/:id/meio-pagamento", addMeioPagamentoHandler);

  /**
   * @openapi
   * '/api/users/{id}/meio-pagamento':
   *  get:
   *     tags:
   *     - Usuário
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id usuário
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/MeioPagamentoResponse'
   *       404:
   *         description: Usuário não encontrado
   */
  app.get("/api/users/:id/meio-pagamento", getMeiosPagamentoHandler);

  /**
   * @openapi
   * /api/prestadores:
   *  get:
   *    tags:
   *    - Prestador
   *    responses:
   *      200:
   *        description: Sucesso
   *
   */
  app.get("/api/prestadores", getPrestadoresHandler);

  /**
   * @openapi
   * '/api/prestadores/{id}':
   *  get:
   *     tags:
   *     - Prestador
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do prestador
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/PrestadorResponse'
   *       404:
   *         description: Prestador não encontrado
   */
  app.get("/api/prestadores/:id", getPrestadorHandler);

  /**
   * @openapi
   * '/api/prestadores':
   *  post:
   *     tags:
   *     - Prestador
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreatePrestadorInput'
   *     responses:
   *      201:
   *        description: Sucesso
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/PrestadorResponse'
   *      409:
   *        description: Conflito
   *      400:
   *        description: Bad request
   */
  app.post("/api/prestadores", createPrestadorHandler);

  /**
   * @openapi
   * '/api/prestadores/{id}':
   *  put:
   *     tags:
   *     - Prestador
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdatePrestadorInput'
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do prestador
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/PrestadorResponse'
   *       404:
   *         description: Prestador não encontrado
   */
  app.put("/api/prestadores/:id", updatePrestadorHandler);

  /**
   * @openapi
   * '/api/prestadores/{id}':
   *  delete:
   *     tags:
   *     - Prestador
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do prestador
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Prestador não encontrado
   */
  app.delete("/api/prestadores/:id", deletePrestadorHandler);

  /**
   * @openapi
   * '/api/prestadores/{id}/avaliacao':
   *  post:
   *     tags:
   *     - Prestador
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do prestador
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateAvaliacaoInput'
   *     responses:
   *      201:
   *        description: Sucesso
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AvaliacaoResponse'
   *      409:
   *        description: Conflito
   *      400:
   *        description: Bad request
   */
  app.post("/api/prestadores/:id/avaliacao", createAvalicaoHandler);

  /**
   * @openapi
   * '/api/prestadores/{id}/servicos':
   *  get:
   *     tags:
   *     - Prestador
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do prestador
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Prestador não encontrado
   */
  app.get("/api/prestadores/:id/servicos", getPrestadorServicosHandler);

  /**
   * @openapi
   * '/api/prestadores/{id}/colaboradores':
   *  get:
   *     tags:
   *     - Prestador
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do prestador
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Prestador não encontrado
   */
   app.get("/api/prestadores/:id/colaboradores", getPrestadorColaboradoresHandler);


  /**
   * @openapi
   * /api/servicos:
   *  get:
   *    tags:
   *    - Serviço
   *    responses:
   *      200:
   *        description: Sucesso
   */
  app.get("/api/servicos", getServicosHandler);

  /**
   * @openapi
   * '/api/servicos/{id}':
   *  get:
   *     tags:
   *     - Serviço
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do serviço
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Serviço não encontrado
   */
  app.get("/api/servicos/:id", getServicoHandler);

  /**
   * @openapi
   * '/api/servicos':
   *  post:
   *     tags:
   *     - Serviço
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateServicoInput'
   *     responses:
   *      201:
   *        description: Sucesso
   *      409:
   *        description: Conflito
   *      400:
   *        description: Bad request
   */
  app.post("/api/servicos", createServicosHandler);

  /**
   * @openapi
   * '/api/servicos/{id}':
   *  put:
   *     tags:
   *     - Serviço
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateServicoInput'
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do serviço
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Serviço não encontrado
   */
  app.put("/api/servicos/:id", updateServicosHandler);

  /**
   * @openapi
   * '/api/servicos/{id}':
   *  delete:
   *     tags:
   *     - Serviço
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do serviço
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Serviço não encontrado
   */
  app.delete("/api/servicos/:id", deleteServicosHandler);

  /**
   * @openapi
   * '/api/agendamentos/{userId}/agendar/{prestadorId}':
   *  post:
   *     tags:
   *     - Agendamento
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateAgendamentoInput'
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
  app.post(
    "/api/agendamentos/:userId/agendar/:prestadorId",
    createAgendamentoHandler
  );

  /**
   * @openapi
   * /api/agendamentos/user/{id}:
   *  get:
   *    tags:
   *    - Agendamento
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
  
  app.get("/api/agendamentos/prestador/:id", getAgendamentosByPrestadorHandler);

  /**
   * @openapi
   * /api/agendamentos/{id}:
   *  get:
   *    tags:
   *    - Agendamento
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

  /**
   * @openapi
   * /api/agendamentos/{id}:
   *  put:
   *    tags:
   *    - Agendamento
   *    parameters:
   *      - name: id
   *        in: path
   *        description: O id do agendamento
   *        required: true
   *    responses:
   *      200:
   *        description: Sucesso
   */
  app.put("/api/agendamentos/:id", updateAgendamentoHandler);

  /**
   * @openapi
   * '/api/agendamentos/{id}':
   *  delete:
   *     tags:
   *     - Agendamento
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do agendamento
   *        required: true
   *     responses:
   *       200:
   *         description: Sucesso
   *       404:
   *         description: Serviço não encontrado
   */
  app.delete("/api/agendamentos/:id", deleteAgendamentoHandler);

  /**
   * @openapi
   * /api/create_payment_intent:
   *  get:
   *    tags:
   *    - Pagamento
   *    requestBody:
   *     required: true
   *     content:
   *       application/json:
   *          schema:
   *             $ref: '#/components/schemas/CreatePaymentIntentInput'
   *    responses:
   *      200:
   *        description: Sucesso
   */
  app.post("/api/create_payment_intent", createPaymentIntent);

  /**
   * @openapi
   * /api/colaboradores:
   *  get:
   *    tags:
   *    - Colaborador
   *    responses:
   *      200:
   *        description: Sucesso
   */
   app.get("/api/colaboradores", getColaboradoresHandler);

   /**
    * @openapi
    * '/api/colaborador/{id}':
    *  get:
    *     tags:
    *     - Colaborador
    *     parameters:
    *      - name: id
    *        in: path
    *        description: O id do colaborador
    *        required: true
    *     responses:
    *       200:
    *         description: Sucesso
    *       404:
    *         description: colaborador não encontrado
    */
   app.get("/api/colaborador/:id", getColaboradorHandler);
 
   /**
    * @openapi
    * '/api/colaborador/{id}/agendamentos':
    *  get:
    *     tags:
    *     - Colaborador
    *     parameters:
    *      - name: id
    *        in: path
    *        description: O id do colaborador
    *        required: true
    *     responses:
    *       200:
    *         description: Sucesso
    *       404:
    *         description: colaborador não encontrado
    */
    app.get("/api/colaborador/:id/agendamentos", getColaboradorAgendamentosHandler);

   /**
    * @openapi
    * '/api/colaborador':
    *  post:
    *     tags:
    *     - Colaborador
    *     requestBody:
    *      required: true
    *     responses:
    *      201:
    *        description: Sucesso
    *      409:
    *        description: Conflito
    *      400:
    *        description: Bad request
    */
   app.post("/api/colaborador", createColaboradorHandler);
 
   /**
    * @openapi
    * '/api/colaborador/{id}':
    *  put:
    *     tags:
    *     - Colaborador
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateColaboradorInput'
    *     parameters:
    *      - name: id
    *        in: path
    *        description: O id do colaborador
    *        required: true
    *     responses:
    *       200:
    *         description: Sucesso
    *       404:
    *         description: colaborador não encontrado
    */
   app.put("/api/colaborador/:id", updateColaboradorHandler);
 
   /**
    * @openapi
    * '/api/colaborador/{id}':
    *  delete:
    *     tags:
    *     - Colaborador
    *     parameters:
    *      - name: id
    *        in: path
    *        description: O id do colaborador
    *        required: true
    *     responses:
    *       200:
    *         description: Sucesso
    *       404:
    *         description: Colaborador não encontrado
    */
   app.delete("/api/colaborador/:id", deleteColaboradorHandler);
 };

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
 *        tipo_pessoa:
 *          type: string
 *          default: Jane Doe
 *        rua:
 *          type: string
 *          default: Rua
 *        numero:
 *          type: string
 *          default: 1
 *        bairro:
 *          type: string
 *          default: Bairro
 *        cidade:
 *          type: string
 *          default: Cidade
 *        estado:
 *          type: string
 *          default: Estado
 *        cep:
 *          type: string
 *          default: CEP
 *    UserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        tipo_pessoa:
 *          type: string
 *        rua:
 *          type: string
 *        numero:
 *          type: string
 *        bairro:
 *          type: string
 *        cidade:
 *          type: string
 *        estado:
 *          type: string
 *        cep:
 *          type: string
 *    UpdateUserInput:
 *      type: object
 *      required:
 *        []
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        tipo_pessoa:
 *          type: string
 *          default: Jane Doe
 *        rua:
 *          type: string
 *          default: Rua
 *        numero:
 *          type: string
 *          default: 1
 *        bairro:
 *          type: string
 *          default: Bairro
 *        cidade:
 *          type: string
 *          default: Cidade
 *        estado:
 *          type: string
 *          default: Estado
 *        cep:
 *          type: string
 *          default: CEP
 *    PrestadorResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        tipo_pessoa:
 *          type: string
 *        rua:
 *          type: string
 *        numero:
 *          type: string
 *        bairro:
 *          type: string
 *        cidade:
 *          type: string
 *        estado:
 *          type: string
 *        cep:
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
*        tipo_pessoa:
 *          type: string
 *        rua:
 *          type: string
 *        numero:
 *          type: string
 *        bairro:
 *          type: string
 *        cidade:
 *          type: string
 *        estado:
 *          type: string
 *        cep:
 *          type: string
 *    MeioPagamentoResponse:
 *      type: object
 *      properties:
 *        meioPagamento:
 *          type: string
 *        numeroCartao:
 *          type: string
 *        codSeguranca:
 *          type: string
 *        validade:
 *          type: string
 *    CreateFavoritoInput:
 *      type: object
 *      required:
 *        - userId
 *      properties:
 *        userId:
 *          type: int
 *          default: 9
 *    CreateAvaliacaoInput:
 *      type: object
 *      required:
 *        - userId
 *        - avaliacao
 *      properties:
 *        userId:
 *          type: int
 *          default: 9
 *        avaliacao:
 *          type: string
 *          default: avaliação
 *    AvaliacaoResponse:
 *      type: object
 *      properties:
 *        userId:
 *          type: int
 *        avaliacao:
 *          type: string
 *    CreateServicoInput:
 *      type: object
 *      required:
 *        - titulo
 *        -  descricao
 *        -  preco
 *        -  idPrestador
 *          
 *      properties:
 *        titulo:
 *          type: string
 *          default: Serviço
 *        descricao:
 *          type: string
 *          default: Descrição
 *        preco:
 *          type: string
 *          default: 10
 *        imagem:
 *          type: string
 *          default: imagem_url
 *        idPrestador:
 *          type: int
 *          default: 1
 *    UpdateServicoInput:
 *      type: object
 *      required:
 *        []
 *      properties:
 *        nomeServico:
 *          type: string
 *          default: Serviço
 *    CreateAgendamentoInput:
 *      type: object
 *      required:
 *        - data
 *        - servicoId
 *          
 *      properties:
 *        data:
 *          type: string
 *          default: 2022-10-30T12:00:00.000-03:00
 *        servicoId:
 *          type: int
 *          default: 1
 *    CreateColaboradorInput:
 *      type: object
 *      required:
 *        - nome
 *        - prestadorId
 *
 *      properties:
 *        nome:
 *          type: string
 *          default: 2022-10-30T12:00:00.000-03:00
 *        foto_url:
 *          type: string
 *          default: ""
 *        prestadorId:
 *          type: int
 *          default: 1
 */
