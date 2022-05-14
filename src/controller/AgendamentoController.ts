import { Request, Response } from "express";
import { createAgendamento, getAgendamento, getAgendamentosByUser } from "../service/AgendamentoService";
import { getPrestador } from "../service/PrestadorService";
import { getUser } from "../service/UserService";

export const createAgendamentoHandler = async (req: Request, res: Response) => {
    const { userId, prestadorId } = req.params;

    const user = await getUser(parseInt(userId));

    if (!user) {
        return res.status(404).send('User not found');
    }

    const prestador = await getPrestador(parseInt(prestadorId));

    if (!prestador) {
        return res.status(404).send('Prestador not found');
    }

    const { data, hora } = req.body;

    const agendamento = await createAgendamento({
        data,
        hora,
        user,
        prestador
    });

    return res.status(201).send(agendamento);
}

export const getAgendamentosByUserHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id)
    const user = await getUser(userId);

    if (!user) {
        return res.status(400).send('User not found');
    }

    const agendamentos = await getAgendamentosByUser(user);

    return res.status(200).send(agendamentos);
}

export const getAgendamentoHandler = async (req: Request, res: Response) => {
    const agendamentoId = parseInt(req.params.id);
    
    const agendamento = await getAgendamento(agendamentoId);

    if (!agendamento) return res.status(404).send('Agendamento not found');

    return res.status(200).send(agendamento);
}
