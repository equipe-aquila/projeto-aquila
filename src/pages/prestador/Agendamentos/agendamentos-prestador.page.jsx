import { AutoCenter, NavBar, Image } from "antd-mobile";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AgendamentoCard from "../../../components/agendamento-card.component";
import { Header } from "../../../components/Header";
import { Modal } from "../../../components/Modal/Modal";
import { UserContext } from "../../../contexts/user.context";

const AgendamentosPrestador = () => {
  const { setLoading } = useContext(UserContext);
  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamentosPagos, setAgendamentosPagos] = useState([]);

  const { funcionario_id } = useParams();

  useEffect(() => {
    const getAgendamentos = async () => {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/colaborador/${funcionario_id}/agendamentos`
      );

      const agendamentos =
        res.data.length > 0
          ? res.data.filter((agendamento) => !agendamento.pago)
          : [];

      const agendamentosPagos = res.data.filter(
        (agendamento) => agendamento.pago
      );
      setAgendamentos(agendamentos);
      setAgendamentosPagos(agendamentosPagos);
      setLoading(false);
    };

    getAgendamentos();
  }, []);

  return (
    <div style={{ marginBottom: "80px" }}>
      <Header navigation={"/prestadores"} />
      <AutoCenter>
        <h1 style={{ color: "black", marginBottom: "80px" }}>
          Meus agendamentos
        </h1>
      </AutoCenter>

      {agendamentos?.length > 0 || agendamentosPagos?.length > 0 ? (
        <Fragment>
          {agendamentos?.length > 0 && (
            <div>
              <AutoCenter>
                <h2 style={{ color: "black" }}>Agendamentos não pagos</h2>
              </AutoCenter>
              <div>
                {agendamentos?.map((agendamento, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: "40px",
                        paddingRight: "40px"
                      }}
                    >
                      <div
                        style={{
                          width: "900px",
                          paddingBottom: "6px",
                          border: "2px solid #7f6aab",
                          marginBottom: "12px",
                          borderRadius: "8px"
                        }}
                      >
                        <AgendamentoCard agendamentoId={agendamento.id} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {agendamentosPagos?.length > 0 && (
            <div>
              <AutoCenter>
                <h2 style={{ color: "black" }}>Agendamentos pagos</h2>
              </AutoCenter>

              {agendamentosPagos?.map((agendamento, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingLeft: "40px",
                      paddingRight: "40px"
                    }}
                  >
                    <div
                      style={{
                        width: "900px",
                        paddingBottom: "6px",
                        border: "2px solid #7f6aab",
                        marginBottom: "12px",
                        borderRadius: "8px"
                      }}
                    >
                      <AgendamentoCard agendamentoId={agendamento.id} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Fragment>
      ) : (
        <AutoCenter>
          <h2 stlye={{ marginTop: "15px" }}>
            Este funcionário não possui nenhum agendamento
          </h2>
        </AutoCenter>
      )}
    </div>
  );
};

export default AgendamentosPrestador;
