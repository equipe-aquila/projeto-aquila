import { Servico } from "../entities/Servico";
import { getConnection } from "typeorm";
import { Avaliacao, avaliacaoInput } from "../entities/Avaliacao";
import { Prestador, prestadorInput } from "../entities/Prestador";

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

    const servicos = [];

    for (const colaborador of colaboradores) {
        const servico = await Servico.find({where: { colaborador }});
        servicos.push(servico)
    }

    return servicos;
}

export const getColaboradores = async (prestador: Prestador) => {
    const colaboradores = await getConnection()
    .createQueryBuilder()
    .relation(Prestador, 'colaboradores')
    .of(prestador)
    .loadMany();

    return colaboradores;
}