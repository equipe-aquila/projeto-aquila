import { Request, Response } from "express";
import { getPrestadores } from "../service/PrestadorService";

export const getPrestadoresHandler = async (req: Request, res: Response) => {
    const prestadores = await getPrestadores();
  
    return res.status(200).send(prestadores);
}
