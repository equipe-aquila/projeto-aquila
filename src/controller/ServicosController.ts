import { Request, Response } from "express";
import { createServico, deleteServico, getServicos, updateServico, getServicosByUser} from '../service/ServicosService'

export const getServicossHandler = async (req: Request, res: Response) => {
    const users = await getServicos();
  
    return res.status(200).send(users);''
}

export const getServicosByUserHandler = async (req: Request, res: Response) => {
    const IdServico = parseInt(req.params.id)
    const user = await getServicosByUser(IdServico);

    if (!user) {
        return res.status(400).send('User not found');
    }

    const agendamentos = await getServicosByUser(IdServico);

    return res.status(200).send(agendamentos);
}

export const createServicosHandler = async (req: Request, res: Response) => {
    const user = await createServico(req.body);

    res.status(201).send(user);
}

export const updateServicosHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await getServicosByUser(userId);

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
