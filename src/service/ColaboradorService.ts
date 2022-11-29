import { Servico } from "src/entities/Servico";
import { getConnection } from "typeorm";
import { Colaborador , colaboradorInput} from "../entities/Colaborador";

export const getColaboradores = async () => {
  const colaboradores = await Colaborador.find();

  return colaboradores;
};

export const getColaboradorAgendamentos = async (colaborador: Colaborador) => {
  const agendamentos = await getConnection()
  .createQueryBuilder()
  .relation(Colaborador, 'agendamentos')
  .of(colaborador)
  .loadMany();

  return agendamentos;
}

export const getColaborador = async (id: number) => {
  const servico = await Colaborador.findOne(id);

  return servico;
};

export const createColaborador = async (input: colaboradorInput) => {
  const colaborador = Colaborador.create(input);

  await colaborador.save();

  return colaborador;
};

export const updateColaborador = async (servicoId: number, input: colaboradorInput) => {
  await Colaborador.update(servicoId, input);

  const updatedUser = await Colaborador.findOne(servicoId);

  return updatedUser;
};

export const deleteColaborador = async (servicoId: number) => {
  await Colaborador.delete(servicoId);
};
