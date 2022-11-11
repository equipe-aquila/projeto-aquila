import { Request, Response } from "express";
import { createAvalicao, createPrestador, deletePrestador, getPrestador, getPrestadores, getServicos, updatePrestador } from "../service/PrestadorService";
import { getUser } from "../service/UserService";

export const getPrestadoresHandler = async (req: Request, res: Response) => {
    try {
        const prestadores = await getPrestadores();
  
        return res.status(200).send(prestadores);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const getPrestadorHandler = async (req: Request, res: Response) => {
    try {
        const prestadorId = parseInt(req.params.id);
        const prestador = await getPrestador(prestadorId);

    
        return res.status(200).send(prestador);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const createPrestadorHandler = async (req: Request, res: Response) => {
    try {
        const prestador = await createPrestador(req.body);

        res.status(201).send(prestador);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const updatePrestadorHandler = async (req: Request, res: Response) => {
    try {
        const prestadorId = parseInt(req.params.id);
        const prestador = await getPrestador(prestadorId);

        if (!prestador) {
            return res.status(404).send('Prestador não encontrado')
        }

        const updatedPrestador = await updatePrestador(prestadorId, req.body);

        return res.status(200).send(updatedPrestador);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}


export const deletePrestadorHandler = async (req: Request, res: Response) => {
    try {
        const prestadorId = parseInt(req.params.id);

        await deletePrestador(prestadorId);

        res.status(200).send('Prestador removido com sucesso');
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const createAvalicaoHandler = async (req: Request, res: Response) => {
    try {
        const prestadorId = parseInt(req.params.id);
        const { userId, avaliacao } = req.body

        const prestador = await getPrestador(prestadorId);

        if (!prestador) return res.status(404).send('Prestador not found');

        const user = await getUser(userId);

        if (!user) return res.status(404).send('User not found');

        const newAvaliacao = await createAvalicao({
            avaliacao,
            user,
            prestador
        });

        return res.status(201).send(newAvaliacao);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const getPrestadorServicosHandler = async (req: Request, res: Response) => {
    try {
        const prestadorId = parseInt(req.params.id);

        const prestador = await getPrestador(prestadorId);

        if (!prestador) return res.status(404).send('Prestador not found');

        const servicos = await getServicos(prestador);

        return res.status(200).send(servicos);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}
