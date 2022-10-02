import { Request, Response } from "express";
import { getServico } from "../service/ServicoService";
import {
  createAgendamento,
  deleteAgendamento,
  getAgendamento,
  getAgendamentosByPrestador,
  getAgendamentosByUser,
  updateAgendamento,
} from "../service/AgendamentoService";
import { getPrestador } from "../service/PrestadorService";
import { getUser } from "../service/UserService";

export const createAgendamentoHandler = async (req: Request, res: Response) => {
  const { userId, prestadorId } = req.params;

  const user = await getUser(userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const prestador = await getPrestador(parseInt(prestadorId));

  if (!prestador) {
    return res.status(404).send("Prestador not found");
  }

  const { data, servicoId } = req.body;

  const servico = await getServico(parseInt(servicoId));

  if (!servico) {
    return res.status(404).send("Serviço not found");
  }

  const agendamento = await createAgendamento({
    data,
    user,
    prestador,
    servico,
  });

  return res.status(201).send(agendamento);
};

export const getAgendamentosByUserHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.id;
  const user = await getUser(userId);

  if (!user) {
    return res.status(400).send("User not found");
  }

  const agendamentos = await getAgendamentosByUser(user);

  return res.status(200).send(agendamentos);
};

export const getAgendamentosByPrestadorHandler = async (
  req: Request,
  res: Response
) => {
  const prestadorId = parseInt(req.params.id);
  const prestador = await getPrestador(prestadorId);

  if (!prestador) {
    return res.status(400).send("User not found");
  }

  const agendamentos = await getAgendamentosByPrestador(prestador);

  return res.status(200).send(agendamentos);
};

export const getAgendamentoHandler = async (req: Request, res: Response) => {
  const agendamentoId = parseInt(req.params.id);

  const agendamento = await getAgendamento(agendamentoId);

  if (!agendamento) return res.status(404).send("Agendamento not found");

  return res.status(200).send(agendamento);
};

export const deleteAgendamentoHandler = async (req: Request, res: Response) => {
  const agendamentoId = parseInt(req.params.id);

  await deleteAgendamento(agendamentoId);

  return res.status(200).send("Agendamento removido com sucesso!");
};

export const updateAgendamentoHandler = async (req: Request, res: Response) => {
  const agendamentoId = parseInt(req.params.id);

  const agendamento = await getAgendamento(agendamentoId);

  if (!agendamento) {
    return res.status(404).send("Agendamento não encontrado");
  }

  const updatedAgendamento = await updateAgendamento(agendamentoId, req.body);

  return res.status(200).send(updatedAgendamento);
};
