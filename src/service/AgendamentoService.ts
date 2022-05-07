import { User } from "../entities/User";
import { Agendamento, agendamentoInput } from "../entities/Agendamento"

export const createAgendamento = async (input: agendamentoInput) => {
    const agendamento = Agendamento.create(input);

    await agendamento.save();

    return agendamento;
}

export const getAgendamentosByUser = async (user: User) => {
    const agendamentos = await Agendamento.find({ where: { user } });

    return agendamentos;
}

export const getAgendamento = async (id: number) => {
    const agendamento = await Agendamento.findOne(id, {
        relations: ['user', 'prestador']
    });

    return agendamento;
}
