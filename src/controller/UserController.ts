import { Request, Response } from "express";
import { createUser, deleteUser, getFavoritos, getUser, getUsers, updateUser } from '../service/UserService'

export const getUsersHandler = async (req: Request, res: Response) => {
    const users = await getUsers();
  
    return res.status(200).send(users);
}

export const getUserHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getUser(userId);

  
    return res.status(200).send(user);
}

export const createUserHandler = async (req: Request, res: Response) => {
    const user = await createUser(req.body);

    res.status(201).send(user);
}

export const updateUserHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getUser(userId);

    if (!user) {
        return res.status(404).send('Usuário não encontrado')
    }

    const updatedUser = await updateUser(userId, req.body);

    return res.status(200).send(updatedUser);
}


export const deleteUserHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    await deleteUser(userId);

    res.status(200).send('Usuário removido com sucesso')
}

export const getUserFavoritosHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    const user = await getUser(userId);

    if (!user) return res.status(404).send('User not found');

    const favoritos = await getFavoritos(user);

    return res.status(200).send(favoritos);
}
