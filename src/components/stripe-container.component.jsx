import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './payment-form.component';
import { useLocation } from 'react-router';


const PUBLIC_KEY = 'pk_test_51KzpspCY7lj4QJBqZTlr9igcsQF8y8TNULNkQzxFx78FDiaSBCnf9sXNzbExVNtWbmXq9mihVF9cIigWumnNfnIO00p4vcblsC';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    const location = useLocation();

    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm agendamento={location.state} />
        </Elements>
    );
}

export default StripeContainer;
