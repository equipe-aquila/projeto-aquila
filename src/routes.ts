import { Express } from "express";
import { createAgendamentoHandler, getAgendamentoHandler, getAgendamentosByUserHandler } from "./controller/AgendamentoController";
import { addFavoritoHandler, createAvalicaoHandler, createPrestadorHandler, deletePrestadorHandler, getPrestadoresHandler, getPrestadorHandler, updatePrestadorHandler } from "./controller/PrestadorController";
import { createServicosHandler, deleteServicosHandler, getServicoHandler, getServicossHandler, updateServicosHandler } from "./controller/ServicoController";
import { addMeioPagamentoHandler, createUserHandler, deleteUserHandler, getMeiosPagamentoHandler, getUserFavoritosHandler, getUserHandler, getUsersHandler, updateUserHandler } from "./controller/UserController";

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
   * '/api/prestadores/{id}/favorito':
   *  post:
   *     tags:
   *     - Prestador
   *     parameters:
   *      - name: id
   *        in: path
   *        description: O id do usuário
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateFavoritoInput'
   *     responses:
   *      201:
   *        description: Sucesso
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              $ref: '#/components/schemas/PrestadorResponse'
   *      409:
   *        description: Conflito
   *      400:
   *        description: Bad request
   */
  app.post("/api/prestadores/:id/favorito", addFavoritoHandler);

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
   * /api/servicos:
   *  get:
   *    tags:
   *    - Serviço
   *    responses:
   *      200:
   *        description: Sucesso
   */
  app.get("/api/servicos", getServicossHandler);

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
 *          default: John Doe
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
 *    CreateMeioPagamentoInput:
 *      type: object
 *      required:
 *        - meioPagamento
 *        - numeroCartao
 *        - nomeTitular
 *        - codSeguranca
 *        - validade
 *      properties:
 *        meioPagamento:
 *          type: string
 *          default: cartão
 *        numeroCartao:
 *          type: string
 *          default: 7895646547
 *        codSeguranca:
 *          type: string
 *          default: 123
 *        validade:
 *          type: string
 *          default: 05/29
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
 *        - nomeServico
 *      properties:
 *        nomeServico:
 *          type: string
 *          default: Serviço
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
 */
