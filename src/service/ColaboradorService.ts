import { Colaborador, colaboradorInput} from "../entities/Colaborador";

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
  
  export const createServicoColaborador = async (input: colaboradorInput) => {
    const servico = Colaborador.create(input);
  
    await servico.save();
  
    return servico;
  };
  
  export const updateServicoColaborador = async (servicoId: number, input: colaboradorInput) => {
    await Colaborador.update(servicoId, input);
  
    const updatedUser = await Colaborador.findOne(servicoId);
  
    return updatedUser;
  };
  
  export const deleteServicoColaborador = async (servicoId: number) => {
    await Colaborador.delete(servicoId);
  };
