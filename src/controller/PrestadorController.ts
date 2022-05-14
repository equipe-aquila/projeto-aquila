import { Request, Response } from "express";
import { addFavorito, createAvalicao, createPrestador, deletePrestador, getPrestador, getPrestadores, updatePrestador } from "../service/PrestadorService";
import { getUser } from "../service/UserService";

export const getPrestadoresHandler = async (req: Request, res: Response) => {
    const prestadores = await getPrestadores();
  
    return res.status(200).send(prestadores);
}

export const getPrestadorHandler = async (req: Request, res: Response) => {
    const prestadorId = parseInt(req.params.id);
    const prestador = await getPrestador(prestadorId);

  
    return res.status(200).send(prestador);
}

export const createPrestadorHandler = async (req: Request, res: Response) => {
    const prestador = await createPrestador(req.body);

    res.status(201).send(prestador);
}

export const updatePrestadorHandler = async (req: Request, res: Response) => {
    const prestadorId = parseInt(req.params.id);
    const prestador = await getUser(prestadorId);

    if (!prestador) {
        return res.status(404).send('Prestador não encontrado')
    }

    const updatedPrestador = await updatePrestador(prestadorId, req.body);

    return res.status(200).send(updatedPrestador);
}


export const deletePrestadorHandler = async (req: Request, res: Response) => {
    const prestadorId = parseInt(req.params.id);

    await deletePrestador(prestadorId);

    res.status(200).send('Prestador removido com sucesso');
}

export const addFavoritoHandler = async (req: Request, res: Response) => {
    const prestadorId = parseInt(req.params.id);
    const prestador = await getPrestador(prestadorId);

    if (!prestador) return res.status(404).send('Prestador not found');

    const { userId } = req.body;
    const user = await getUser(userId);

    if (!user) return res.status(404).send('User not found');
    
    const favoritos = await addFavorito(user, prestador);
    
    return res.status(201).send(favoritos);
}

export const createAvalicaoHandler = async (req: Request, res: Response) => {
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
}
