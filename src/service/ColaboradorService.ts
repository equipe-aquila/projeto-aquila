import { User } from "../entities/User";
import { Colaborador, servicoInput} from "../entities/Colaborador";
import { Prestador } from "../entities/Prestador";

export const getServicosColaborador = async () => {
    const servicos = await Colaborador.find();
  
    return servicos;
  };
  
  export const getServicoColaborador = async (id: number) => {
    const servico = await Colaborador.findOne(id, {
      relations: ["colaborador"],
    });
  
    return servico;
  };
  
  export const createServicoColaborador = async (input: servicoInput) => {
    const servico = Colaborador.create(input);
  
    await servico.save();
  
    return servico;
  };
  
  export const updateServicoColaborador = async (servicoId: number, input: servicoInput) => {
    await Colaborador.update(servicoId, input);
  
    const updatedUser = await Colaborador.findOne(servicoId);
  
    return updatedUser;
  };
  
  export const deleteServicoColaborador = async (servicoId: number) => {
    await Colaborador.delete(servicoId);
  };
