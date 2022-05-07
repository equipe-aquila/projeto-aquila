import { Express } from "express";
import { addFavoritoHandler, getPrestadoresHandler } from "./controller/PrestadorController";
import { createUserHandler, deleteUserHandler, getUserHandler, getUsersHandler, updateUserHandler } from "./controller/UserController";
import { createUsuarioHandler, deleteUsuarioHandler, getUsuariosHandler, getUsuarioHandler, updateUsuarioHandler } from "./controller/UsuarioController";
import { createPrestadorsHandler, deletePrestadorsHandler, getPrestadorsHandler, getPrestadoressHandler, updatePrestadorsHandler } from "./controller/PrestadorServicoController";
import { createServicosHandler, deleteServicosHandler, getServicosHandler, getServicossHandler, updateServicosHandler } from "./controller/ServicosController";


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
  app.get("/api/servicos", getServicossHandler);

  app.get("/api/servicos/:id", getServicosHandler);

  app.post("/api/servico", createServicosHandler);

  app.put("/api/uservicos/:id", updateServicosHandler);

  app.delete("/api/servicos/:id", deleteServicosHandler);

  /**
   * @openapi
   * /api/usuarios:
   *  get:
   *    tags:
   *    - Users
   *    description: Fetch all users
   *    responses:
   *      200:
   *        description: Succesfully fetched all users
   */
   app.get("/api/usuarios", getUsuariosHandler);

   app.get("/api/usuarios/:id", getUsuarioHandler);
 
   app.post("/api/usuarios", createUsuarioHandler);
 
   app.put("/api/usuarios/:id", updateUsuarioHandler);
 
   app.delete("/api/usuarios/:id", deleteUsuarioHandler);

  /**
   * @openapi
   * /api/prestador:
   *  get:
   *    tags:
   *    - Users
   *    description: Fetch all users
   *    responses:
   *      200:
   *        description: Succesfully fetched all users
   */
   app.get("/api/prestadors", getPrestadoressHandler);

   app.get("/api/prestadors/:id", getPrestadorsHandler);
 
   app.post("/api/prestadorAll", createPrestadorsHandler);
 
   app.put("/api/prestadors/:id", updatePrestadorsHandler);
 
   app.delete("/api/prestadors/:id", deletePrestadorsHandler); 

   /**
   * @openapi
   * /api/prestador:
   *  get:
   *    tags:
   *    - Users
   *    description: Fetch all users
   *    responses:
   *      200:
   *        description: Succesfully fetched all users
   */
    app.get("/api/prestadors", getPrestadoressHandler);

    app.get("/api/prestadors/:id", getPrestadorsHandler);
  
    app.post("/api/prestadorAll", createPrestadorsHandler);
  
    app.put("/api/prestadors/:id", updatePrestadorsHandler);
  
    app.delete("/api/prestadors/:id", deletePrestadorsHandler); 
    
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
