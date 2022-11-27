import { Colaborador , colaboradorInput} from "../entities/Colaborador";

export const getServicosColaborador = async () => {
    const servicos = await Colaborador.find();
  
    return servicos;
  };
  
  export const getColaborador = async (id: number) => {
    const servico = await Colaborador.findOne(id);
  
    return servico;
  };
  
  export const createColaborador = async (input: colaboradorInput) => {
    const servico = Colaborador.create(input);
  
    await servico.save();
  
    return servico;
  };
  
  export const updateColaborador = async (servicoId: number, input: colaboradorInput) => {
    await Colaborador.update(servicoId, input);
  
    const updatedUser = await Colaborador.findOne(servicoId);
  
    return updatedUser;
  };
  
  export const deleteColaborador = async (servicoId: number) => {
    await Colaborador.delete(servicoId);
  };
