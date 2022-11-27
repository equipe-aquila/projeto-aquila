import { Request, Response } from "express";
import { getColaborador } from "../service/ColaboradorService";
import { createServico, deleteServico, getServicos, updateServico, getServico} from '../service/ServicoService'

export const getServicosHandler = async (req: Request, res: Response) => {
    try {
        const users = await getServicos();
  
        return res.status(200).send(users);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const getServicoHandler = async (req: Request, res: Response) => {
    try {
        const servicoId = parseInt(req.params.id)
        const servico = await getServico(servicoId);

        if (!servico) {
            return res.status(400).send('Serviço not found');
        }

        return res.status(200).send(servico);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const createServicosHandler = async (req: Request, res: Response) => {
    try {
        const { titulo, descricao, preco, imagem, idColaborador } = req.body;

        const colaborador = await getColaborador(idColaborador);

        if (!colaborador) {
            return res.status(400).send('Prestador not found');
        }

        const servico = await createServico({
            titulo,
            descricao,
            preco,
            imagem,
            colaborador
        });

        return res.status(201).send(servico);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}

export const updateServicosHandler = async (req: Request, res: Response) => {
    try {
        const servicoId = parseInt(req.params.id);
    const servico = await getServico(servicoId);

    if (!servico) {
        return res.status(404).send('Serviço não encontrado');
    }

    const updatedServico = await updateServico(servicoId, req.body);

    return res.status(200).send(updatedServico);
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}


export const deleteServicosHandler = async (req: Request, res: Response) => {
    try {
        const servicoId = parseInt(req.params.id);

        await deleteServico(servicoId);
    
        res.status(200).send('Serviço removido com sucesso'); 
    } catch (error) {
        return res.status(200).send({'error': error.message});
    }
}
