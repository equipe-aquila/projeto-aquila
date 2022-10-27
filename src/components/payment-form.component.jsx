import { useState } from 'react';
import { useNavigate } from 'react-router'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, NavBar, AutoCenter } from 'antd-mobile';
import axios from 'axios';

import './payment.styles.css'


const PaymentForm = ({agendamento}) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const {id} = paymentMethod
                const res = await axios.post('https://projeto-aquila.herokuapp.com/api/create_payment_intent', {
                    amount: agendamento.servico.preco * 100,
                    id
                });

                console.log(res.data)

                if (res.data.status === 'succeeded') {
                    setSuccess(true);

                    await axios.put(`https://projeto-aquila.herokuapp.com/api/agendamentos/${agendamento.id}`, {
                        status: true
                    });
                }
            } catch (error) {
                console.log("Error", error);
            }
        } else {
            setError(error.message);
            console.log(error.message);
        }
    }

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fce883" },
                "::placeholder": { color: "#87bbfd" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }

    return (
        <>
            <NavBar onBack={() => navigate(-1)} style={{marginBottom: '15px'}}>
                Pagamento
            </NavBar>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <fieldset className='FormGroup'>
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS}/>
                        </div>
                    </fieldset>
                    <Button color='primary' style={{float: 'right', marginRight: '15px'}} type='submit'>Pagar</Button>
                </form>
            ) : (
                <div>
                    <AutoCenter><h2>Pagamento realizado com sucesso</h2></AutoCenter>
                </div>
            )}
            <AutoCenter style={{marginTop: '15px'}}>{error && error}</AutoCenter>
        </>
    );
}

export default PaymentForm;
