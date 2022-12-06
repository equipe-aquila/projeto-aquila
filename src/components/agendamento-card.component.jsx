import { useNavigate } from "react-router";
import { Card, Grid, Space } from "antd-mobile";
import {
  CalendarOutline,
  CheckCircleFill,
  ClockCircleOutline
} from "antd-mobile-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import "./agendamento-card.css";

const AgendamentoCard = ({ agendamentoId }) => {
  const navigate = useNavigate();
  const [agendamento, setAgendamento] = useState({
    status: false,
    data: null,
    prestador: {
      name: null
    },
    servico: {
      name: null,
      preco: 0
    }
  });

  useEffect(() => {
    const getAgendamento = async () => {
      const res = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/agendamentos/${agendamentoId}`
      );

      setAgendamento(res.data);
    };

    getAgendamento();
  }, []);

  return (
    <Card
      className="agendamento-card"
      onClick={
        agendamento.pago
          ? () => null
          : () => navigate(`/payment`, { state: agendamento })
      }
    >
      <Grid columns={2}>
        <Grid.Item style={{ alignSelf: "center", justifySelf: "left" }}>
          <Space direction="vertical">
            <div style={{ display: "flex", alignItems: "center" }}>
              <CalendarOutline />
              <span
                style={{
                  fontSize: "medium",
                  fontWeight: "bold",
                  padding: ".3rem"
                }}
              >
                {new Date(agendamento.data).toLocaleDateString()} -{" "}
                {new Date(agendamento.data).toLocaleTimeString().split(":")[0]}:
                {new Date(agendamento.data).toLocaleTimeString().split(":")[1]}{" "}
                {new Date(agendamento.data).toLocaleTimeString().split(" ")[1]}
              </span>
            </div>
            {agendamento.pago ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleFill color="green" />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "300",
                    padding: ".3rem"
                  }}
                >
                  Pago
                </span>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <ClockCircleOutline />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "300",
                    padding: ".3rem"
                  }}
                >
                  Aguardando pagamento
                </span>
              </div>
            )}
          </Space>
        </Grid.Item>
        <Grid.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end"
            }}
          >
            <span
              style={{
                fontSize: "medium",
                fontWeight: "bold"
              }}
            >
              {agendamento?.prestador?.name?.length > 15
                ? agendamento?.prestador?.name?.slice(0, 15) + "..."
                : agendamento?.prestador?.name}
            </span>
            <span
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                padding: ".3rem"
              }}
            >
              {agendamento?.servico?.titulo}{" "}
            </span>
            <span
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                padding: ".3rem"
              }}
            >
              {agendamento?.servico?.preco.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency"
              })}
            </span>
          </div>
        </Grid.Item>
      </Grid>
    </Card>
  );
};

export default AgendamentoCard;
