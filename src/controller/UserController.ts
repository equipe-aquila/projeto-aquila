import { Request, Response } from "express";
import { getPrestador } from "../service/PrestadorService";
import {
  addFavorito,
  addMeioPagamento,
  createUser,
  deleteFavorito,
  deleteUser,
  getFavoritos,
  getMeiosPagamento,
  getUser,
  getUsers,
  updateUser,
} from "../service/UserService";

export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).send(users);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
  
    if (!user) {
      return res.status(404).send("User not found");
    }
  
    return res.status(200).send(user);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const userExists = await getUser(id);

    if (!userExists) {
      const user = await createUser(req.body);
      res.status(201).send(user);
    }

    return res.status(200).send(userExists);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
  
    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }
  
    const updatedUser = await updateUser(userId, req.body);
  
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    await deleteUser(userId);
  
    res.status(200).send("Usuário removido com sucesso");
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const getUserFavoritosHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await getUser(userId);
  
    if (!user) return res.status(404).send("User not found");
  
    const favoritos = await getFavoritos(user);
  
    return res.status(200).send(favoritos);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const addFavoritoHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { prestadorId } = req.body;
  
    const user = await getUser(userId);
    const prestador = await getPrestador(prestadorId);
  
    if (!user) return res.status(404).send("User not found");
    if (!prestador) return res.status(404).send("Prestador not found");
  
    try {
      var newFavorito = await addFavorito(user, prestador);
    } catch (error) {
      return res.status(400).send("Ocorreu um erro");
    }
  
    return res.status(201).send(newFavorito);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const deleteFavoritoHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { prestadorId } = req.body;
  
    const user = await getUser(userId);
    const prestador = await getPrestador(prestadorId);
  
    if (!user) return res.status(404).send("User not found");
    if (!prestador) return res.status(404).send("Prestador not found");
  
    const deleted = await deleteFavorito(user, prestador);
  
    return res.status(201).send(deleted);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const addMeioPagamentoHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await getUser(userId);
  
    if (!user) return res.status(404).send("User not found");
  
    const input = req.body;
    input.user = user;
  
    const meioPagamento = await addMeioPagamento(input);
  
    return res.status(201).send(meioPagamento);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};

export const getMeiosPagamentoHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await getUser(userId);
  
    if (!user) return res.status(404).send("User not found");
  
    const meiosPagamento = await getMeiosPagamento(user);
  
    return res.status(200).send(meiosPagamento);
  } catch (error) {
    return res.status(200).send({'error': error.message});
  }
};
