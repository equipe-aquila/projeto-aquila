import { Request, Response } from "express";
import { Stripe } from "stripe"

const stripe = new Stripe(
    'sk_test_51KzpspCY7lj4QJBqz1M3BvJpD8klgmeydZlBuVfCBg7cSyAJVYH3KMTvXfoP1CkSrOyAPoztZKPt9dHg2vdqBjci00xUyzf1RN', {
        apiVersion: "2020-08-27", typescript: true
    });

export const addPaymentMethod = async (req: Request, res: Response) => {
    const paymentMethod = await stripe.paymentMethods.create(req.body);

    return res.status(200).send(paymentMethod);
}

export const createPaymentIntent = async (req: Request, res: Response) => {
    const paymentIntent = await stripe.paymentIntents.create(req.body);

    return res.status(200).send(paymentIntent);
}

export const confirmPaymentIntent = async (req: Request, res: Response) => {
    const { paymentIntentId, paymentMethodId } = req.body;

    const paymentIntent = await stripe.paymentIntents.confirm(
        paymentIntentId,
        { payment_method: paymentMethodId }
    );

    return res.status(200).send(paymentIntent);
}
