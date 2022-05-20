import { Request, Response } from "express";

export const pagamentoHandler = async (req: Request, res: Response) => {
    const mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken('TEST-1289700758935001-051814-8984670e790b5be608e26784dccc22aa-502914238');

    const response = await mercadopago.payment.save(req.body);
    console.log(response);
}
