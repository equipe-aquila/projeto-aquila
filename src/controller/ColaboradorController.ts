import { Request, Response } from "express";
//import { getServico } from "../service/ServicoService";
import {

  createServicoColaborador,
  deleteServicoColaborador,
  getServicoColaborador,
  getServicosColaborador,
  updateServicoColaborador,
} from "../service/ColaboradorService";
import { getPrestador } from "../service/PrestadorService";
import { getUser } from "../service/UserService";

export const getServicosColaboradorsHandler = async (req: Request, res: Response) => {
    const users = await getServicosColaborador();
  
    return res.status(200).send(users);
}

export const getServicoColaboradorHandler = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id)
    const servico = await getServicoColaborador(servicoId);

    if (!servico) {
        return res.status(400).send('Serviço not found');
    }

    return res.status(200).send(servico);
}

export const createServicosColaboradorHandler = async (req: Request, res: Response) => {
    const { nome_Colaborador, idPrestador } = req.body;

    const prestador = await getPrestador(idPrestador);

    if (!prestador) {
        return res.status(400).send('Prestador not found');
    }

    const servico = await createServicoColaborador({
        nome_Colaborador 
    });

    return res.status(201).send(servico);
}

export const updateServicosColaboradorHandler = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id);
    const servico = await getServicoColaborador(servicoId);

    if (!servico) {
        return res.status(404).send('Serviço não encontrado');
    }

    const updatedServico = await updateServicoColaborador(servicoId, req.body);

    return res.status(200).send(updatedServico);
}


export const deleteServicosColaboradorHandler = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id);

    await deleteServicoColaborador(servicoId);

    res.status(200).send('Serviço removido com sucesso');
}
