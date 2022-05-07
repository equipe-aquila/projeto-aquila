import { Request, Response } from "express";
import { createServico, deleteServico, getServico, getServicos, updateServico} from '../service/ServicosService'

export const getServicossHandler = async (req: Request, res: Response) => {
    const users = await getServicos();
  
    return res.status(200).send(users);
}

export const getServicosHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getServico(userId);

  
    return res.status(200).send(user);
}

export const createServicosHandler = async (req: Request, res: Response) => {
    const user = await createServico(req.body);

    res.status(201).send(user);
}

export const updateServicosHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getServico(userId);

    if (!user) {
        return res.status(404).send('Usuário não encontrado')
    }

    const updatedUser = await updateServico(userId, req.body);

    return res.status(200).send(updatedUser);
}


export const deleteServicosHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    await deleteServico(userId);

    res.status(200).send('Usuário removido com sucesso')
}
