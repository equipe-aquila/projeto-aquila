import { Request, Response } from "express";
import { getUsers } from '../service/UserService'

export const getUsersHandler = async (req: Request, res: Response) => {
    const users = await getUsers();
  
    return res.status(200).send(users);
}
