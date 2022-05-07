import { User } from "../entities/User"
import { getConnection } from "typeorm"
import { Avaliacao, avaliacaoInput } from "../entities/Avaliacao"
import { Prestador } from "../entities/Prestador"
import { getFavoritos } from "./UserService"

export const getPrestadores = async () => {
    const prestadores = await Prestador.find()

    return prestadores
}


export const getPrestador = async (prestadorId: number) => {
    const prestador = await Prestador.findOne(prestadorId)

    return prestador
}

export const addFavorito = async (user: User, prestador: Prestador) => {
    await getConnection()
        .createQueryBuilder()
        .relation(User, 'favoritos')
        .of(user)
        .add(prestador);

    const favoritos = await getFavoritos(user);

    return favoritos;
}

export const createAvalicao = async (input: avaliacaoInput) => {
    const avalicao = Avaliacao.create(input);

    await avalicao.save();

    return avalicao;
}
