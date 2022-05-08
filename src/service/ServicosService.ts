import { User } from "../entities/User";
//import { Servico } from "../entities/Servico";
import {Servico, servicoInput } from "../entities/Servico"

export const getServicos = async () => {
    const users = await User.find();
;
    return users
}

export const getServicosByUser = async (id: number) => {
    const servico = await Servico.findOne(id, {
        relations: ['user', 'prestador']
    });

    return servico;
}

export const createServico = async (input: servicoInput) => {
    const servico = Servico.create(input);

    await servico.save();

    return servico;
}

export const updateServico = async (serviceId: number, input: servicoInput) => {

        await Servico.update(serviceId, input);
    
        const updatedUser = await User.findOne(serviceId);
    
        return updatedUser;
}
    
    
export const deleteServico = async (serviceId: number) => {    
        await User.delete(serviceId);
}
