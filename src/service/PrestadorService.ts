import { Avaliacao, avaliacaoInput } from "../entities/Avaliacao"
import { Prestador } from "../entities/Prestador"

export const getPrestadores = async () => {
    const prestadores = await Prestador.find()

    return prestadores
}


export const getPrestador = async (prestadorId: number) => {
    const prestador = await Prestador.findOne(prestadorId)

    return prestador
}

export const createAvalicao = async (input: avaliacaoInput) => {
    const avalicao = Avaliacao.create(input);

    await avalicao.save();

    return avalicao;
}
