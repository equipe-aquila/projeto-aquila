import { Request, Response } from "express";
import { createUsuario, deleteUsuario, getUsuarios, getUsuario, updateUsuario } from '../service/UsuarioService'

export const getUsuariosHandler = async (req: Request, res: Response) => {
    const users = await getUsuarios();
  
    return res.status(200).send(users);
}

export const getUsuarioHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getUsuario(userId);

  
    return res.status(200).send(user);
}

export const createUsuarioHandler = async (req: Request, res: Response) => {
    const user = await createUsuario(req.body);

    res.status(201).send(user);
}

export const updateUsuarioHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getUsuario(userId);

    if (!user) {
        return res.status(404).send('Usuário não encontrado')
    }

    const updatedUser = await updateUsuario(userId, req.body);

    return res.status(200).send(updatedUser);
}


export const deleteUsuarioHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    await deleteUsuario(userId);

    res.status(200).send('Usuário removido com sucesso')
}
