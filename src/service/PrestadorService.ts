import { Servico } from "../entities/Servico";
import { getConnection } from "typeorm";
import { Avaliacao, avaliacaoInput } from "../entities/Avaliacao";
import { Prestador, prestadorInput } from "../entities/Prestador";
import { Colaborador } from "../entities/Colaborador";

export const getPrestadores = async () => {
    const prestadores = await Prestador.find()

    return prestadores
}

export const getPrestador = async (prestadorId: number) => {
    const prestador = await Prestador.findOne(prestadorId)

    return prestador
}

export const createPrestador = async (input: prestadorInput) => {
    const prestador = Prestador.create(input);

    await prestador.save();

    return prestador;
}

export const updatePrestador = async (prestadorId: number, input: prestadorInput) => {
    await Prestador.update(prestadorId, input);

    const updatedPrestador = await Prestador.findOne(prestadorId);

    return updatedPrestador;
}


export const deletePrestador = async (prestadorId: number) => {    
    await Prestador.delete(prestadorId);
}

export const createAvalicao = async (input: avaliacaoInput) => {
    const avalicao = Avaliacao.create(input);

    await avalicao.save();

    return avalicao;
}

export const getServicos = async (prestador: Prestador) => {
    const colaboradores = await getConnection()
    .createQueryBuilder()
    .relation(Prestador, 'colaboradores')
    .of(prestador)
    .loadMany();

    let servicos: Servico[] = [];

    for (const colaborador of colaboradores) {
        const servico = await Servico.find({where: { colaborador }});
        servicos = servicos.concat(servico);
    }

    return servicos;
}

export const getColaboradores = async (prestador: Prestador) => {
    const colaboradores = await getConnection()
    .getRepository(Prestador)
    .createQueryBuilder('prestador')
    .where(`prestador.id=${prestador.id}`)
    .leftJoinAndSelect('prestador.colaboradores', 'colaboradores')
    .leftJoinAndSelect('colaboradores.servicos', 'servicos')
    .getMany();

    return colaboradores;
}
