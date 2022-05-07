import { Request, Response } from "express";
import { createPrestador, deletePrestador, getPrestador, getPrestadores, updatePrestador } from '../service/PrestadorServService'

export const getPrestadoressHandler = async (req: Request, res: Response) => {
    const users = await getPrestadores();
  
    return res.status(200).send(users);
}

export const getPrestadorsHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getPrestador(userId);

  
    return res.status(200).send(user);
}

export const createPrestadorsHandler = async (req: Request, res: Response) => {
    const user = await createPrestador(req.body);

    res.status(201).send(user);
}

export const updatePrestadorsHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getPrestador(userId);

    if (!user) {
        return res.status(404).send('Usuário não encontrado')
    }

    const updatedUser = await updatePrestador(userId, req.body);

    return res.status(200).send(updatedUser);
}


export const deletePrestadorsHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    await deletePrestador(userId);

    res.status(200).send('Usuário removido com sucesso')
}
