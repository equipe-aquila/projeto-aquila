import { Request, Response } from "express";
import { createAgendamento } from "../service/AgendamentoService";
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
