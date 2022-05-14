import { Servico, servicoInput } from "../entities/Servico"

export const getServicos = async () => {
    const servicos = await Servico.find();

    return servicos;
}

export const getServico = async (id: number) => {
    const servico = await Servico.findOne(id, {
        relations: ['prestador']
    });

    return servico;
}

export const createServico = async (input: servicoInput) => {
    const servico = Servico.create(input);

    await servico.save();

    return servico;
}

export const updateServico = async (servicoId: number, input: servicoInput) => {
    await Servico.update(servicoId, input);

    const updatedUser = await Servico.findOne(servicoId);

    return updatedUser;
}
    
export const deleteServico = async (servicoId: number) => {    
    await Servico.delete(servicoId);
}
