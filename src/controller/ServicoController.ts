import { Request, Response } from "express";
import { getPrestador } from "../service/PrestadorService";
import { createServico, deleteServico, getServicos, updateServico, getServico} from '../service/ServicoService'

export const getServicossHandler = async (req: Request, res: Response) => {
    const users = await getServicos();
  
    return res.status(200).send(users);''
}

export const getServicoHandler = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id)
    const servico = await getServico(servicoId);

    if (!servico) {
        return res.status(400).send('Serviço not found');
    }

    return res.status(200).send(servico);
}

export const createServicosHandler = async (req: Request, res: Response) => {
    const { titulo, descricao, preco, idPrestador } = req.body;

    const prestador = await getPrestador(idPrestador);

    if (!prestador) {
        return res.status(400).send('Prestador not found');
    }

    const servico = await createServico({
        titulo,
        descricao,
        preco,
        prestador
    });

    return res.status(201).send(servico);
}

export const updateServicosHandler = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id);
    const servico = await getServico(servicoId);

    if (!servico) {
        return res.status(404).send('Serviço não encontrado');
    }

    const updatedServico = await updateServico(servicoId, req.body);

    return res.status(200).send(updatedServico);
}


export const deleteServicosHandler = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id);

    await deleteServico(servicoId);

    res.status(200).send('Serviço removido com sucesso');
}
