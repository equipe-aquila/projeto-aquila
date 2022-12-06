import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, NavBar, AutoCenter, Image } from "antd-mobile";
import axios from "axios";
import { Header } from "./Header";

import "./payment.styles.css";
import { Link } from "react-router-dom";
import { CustomButton } from "./CustomButton";
import { UserContext } from "../contexts/user.context";

const PaymentForm = ({ agendamento }) => {
  const [success, setSuccess] = useState(false);
  const [paymentCode, setPaymentCode] = useState("");
  const [error, setError] = useState("");
  const { loading, setLoading } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    setPaymentCode(paymentMethod.id);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(
          "https://projeto-aquila.herokuapp.com/api/create_payment_intent",
          {
            amount: agendamento.servico.preco * 100,
            id
          }
        );

        if (res.data.status === "succeeded") {
          setSuccess(true);

          await axios.put(
            `https://projeto-aquila.herokuapp.com/api/agendamentos/${agendamento.id}`,
            {
              pago: true
            }
          );
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      setError(error.message);
      console.log(error.message);
    }
    setLoading(false);
  };

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#7f6aab",
        color: "#7f6aab",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#7f6aab" },
        backgroundColor: "white"
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };
  return (
    <>
      <Header navigation={`/appointments`} />

      {!success ? (
        <form onSubmit={handleSubmit} style={{ background: "white" }}>
          <span style={{ marginLeft: 20, fontSize: 16 }}>
            Digite os dados para realizar o pagamento
          </span>

          <fieldset
            className="FormGroup"
            style={{
              marginTop: 20,
              backgroundColor: "white",
              border: "1px solid #7f6aab"
            }}
          >
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <AutoCenter>
            <CustomButton>Pagar</CustomButton>
          </AutoCenter>
        </form>
      ) : (
        <div>
          <AutoCenter>
            <div className="payment-receipt">
              <div className="payment-padding">
                <p className="receipt-title">
                  Comprovante de pagamento
                  <span className="receipt-date">
                    {new Date().toLocaleDateString()}
                  </span>
                </p>

                <span>
                  <strong>Valor: </strong>{" "}
                  {agendamento?.servico?.preco.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </span>
                <span>
                  <strong>Tipo de pagamento: </strong> Cartão de crédito
                </span>
                <div class="strike">
                  <span>Origem</span>
                </div>

                <span>
                  <strong>Efetuado por: </strong> {agendamento?.user?.name}
                </span>
                <span>
                  <strong>Email: </strong> {agendamento?.user?.email}
                </span>
                <div class="strike">
                  <span>Destino</span>
                </div>

                <span>
                  <strong>Enviado para: </strong>{" "}
                  {agendamento?.colaborador?.nomeColaborador}
                </span>

                <span></span>
                <div className="strike">
                  <span>Descrição dos serviços</span>
                </div>
                <span>
                  <strong>Serviço: </strong> {agendamento?.servico?.titulo}
                </span>

                <div style={{ marginTop: 15 }}>
                  <span>
                    <strong>Detalhamento</strong>
                  </span>
                  <div className="receipt-list">
                    {agendamento?.servico?.descricao
                      .split(",")
                      .map((service, index) => {
                        if (service && service !== " ") {
                          return <span key={index}> - {service.trim()}</span>;
                        }
                        return <Fragment key={index}></Fragment>;
                      })}
                  </div>
                </div>
              </div>
            </div>

            <Link className="payment-link" to={`/appointments`}>
              Voltar para meus agendamentos
            </Link>
          </AutoCenter>
        </div>
      )}
      <AutoCenter style={{ marginTop: "15px" }}>{error && error}</AutoCenter>
    </>
  );
};

export default PaymentForm;
