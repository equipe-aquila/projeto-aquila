import { User } from "../entities/User";
import { Agendamento, agendamentoInput } from "../entities/Agendamento";
import { Prestador } from "src/entities/Prestador";

export const createAgendamento = async (input: agendamentoInput) => {
  const agendamento = Agendamento.create(input);

  await agendamento.save();

  return agendamento;
};

export const getAgendamentosByUser = async (user: User) => {
  const agendamentos = await Agendamento.find({ where: { user } });

  return agendamentos;
};

export const getAgendamentosByPrestador = async (prestador: Prestador) => {
  const agendamentos = await Agendamento.find({ where: { prestador } });

  return agendamentos;
};

export const getAgendamento = async (id: number) => {
  const agendamento = await Agendamento.findOne(id, {
    relations: ["user", "prestador", "servico"],
  });

  return agendamento;
};

export const updateAgendamento = async (
  agendamentoId: number,
  input: agendamentoInput
) => {
  await Agendamento.update(agendamentoId, input);

  const updatedAgendamento = await Agendamento.findOne(agendamentoId);

  return updatedAgendamento;
};

export const deleteAgendamento = async (id: number) => {
  await Agendamento.delete(id);
};
