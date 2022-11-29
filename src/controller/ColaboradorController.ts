import { Request, Response } from "express";
import {
  createColaborador,
  deleteColaborador,
  getColaborador,
  getColaboradorAgendamentos,
  getColaboradores,
  updateColaborador,
} from "../service/ColaboradorService";
import { getPrestador } from "../service/PrestadorService";

export const getColaboradoresHandler = async (req: Request, res: Response) => {
    try {
        const colaboradores = await getColaboradores();
  
        return res.status(200).send(colaboradores);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const getColaboradorAgendamentosHandler = async (req: Request, res: Response) => {
    try {
        const colaboradorId = parseInt(req.params.id);
        const colaborador = await getColaborador(colaboradorId);

        if (!colaborador) {
            return res.status(400).send('Colaborador not found');
        }

        const colaboradorAgendamentos = await getColaboradorAgendamentos(colaborador);
  
        return res.status(200).send(colaboradorAgendamentos);
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
        const { nomeColaborador, foto_url, prestadorId } = req.body;

        const prestador = await getPrestador(prestadorId);

        if (!prestador) {
            return res.status(400).send('Prestador not found');
        }

        const colaborador = await createColaborador({
            nomeColaborador,
            foto_url,
            prestador
        });

        return res.status(201).send(colaborador);
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
