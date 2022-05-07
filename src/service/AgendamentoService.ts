import { Agendamento, agendamentoInput } from "../entities/Agendamento"

export const createAgendamento = async (input: agendamentoInput) => {
    const agendamento = Agendamento.create(input);

    await agendamento.save();

    return agendamento;
}
