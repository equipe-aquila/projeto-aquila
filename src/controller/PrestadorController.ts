import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { getPrestador, getPrestadores } from "../service/PrestadorService";
import { getUser } from "../service/UserService";

export const getPrestadoresHandler = async (req: Request, res: Response) => {
    const prestadores = await getPrestadores();
  
    return res.status(200).send(prestadores);
}

export const addFavoritoHandler = async (req: Request, res: Response) => {
    const prestadorId = parseInt(req.params.id);
    const prestador = await getPrestador(prestadorId)

    const { userId } = req.body
    const user = await getUser(userId)
    
    await getConnection()
        .createQueryBuilder()
        .relation(User, 'favoritos')
        .of(user)
        .add(prestador);

    const favoritos = await getConnection()
        .createQueryBuilder()
        .relation(User, 'favoritos')
        .of(user)
        .loadMany();
    
    return res.status(201).send(favoritos);
}
