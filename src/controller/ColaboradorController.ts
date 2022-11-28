import { Request, Response } from "express";
import {

  createColaborador,
  deleteColaborador,
  getColaborador,
  getServicosColaborador,
  updateColaborador,
} from "../service/ColaboradorService";
import { getPrestador } from "../service/PrestadorService";

export const getServicosColaboradorHandler = async (req: Request, res: Response) => {
    try {
        const servicos = await getServicosColaborador();
  
        return res.status(200).send(servicos);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const getColaboradorHandler = async (req: Request, res: Response) => {
    try {
        const colaboradorId = parseInt(req.params.id);
        const colaborador = await getColaborador(colaboradorId);

        if (!colaborador) {
            return res.status(400).send('Colaborador not found');
        }
        return res.status(200).send(colaborador);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const createColaboradorHandler = async (req: Request, res: Response) => {
    try {
        const { nome, foto_url, prestadorId } = req.body;

        const prestador = await getPrestador(prestadorId);

        if (!prestador) {
            return res.status(400).send('Prestador not found');
        }

        const servico = await createColaborador({
            nome,
            foto_url,
            prestador
        });

        return res.status(201).send(servico);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const updateColaboradorHandler = async (req: Request, res: Response) => {
    try {
        const colaboradorId = parseInt(req.params.id);
        const colaborador = await getColaborador(colaboradorId);

        if (!colaborador) {
            return res.status(404).send('Colaborador não encontrado');
        }

        const updatedServico = await updateColaborador(colaboradorId, req.body);

        return res.status(200).send(updatedServico);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}


export const deleteColaboradorHandler = async (req: Request, res: Response) => {
    try {
        const colaboradorId = parseInt(req.params.id);

        await deleteColaborador(colaboradorId);

        res.status(200).send('Colaborador removido com sucesso');
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}
