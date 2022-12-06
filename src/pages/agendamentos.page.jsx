import { AutoCenter, NavBar, Image } from "antd-mobile";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AgendamentoCard from "../components/agendamento-card.component";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/user.context";

const Agendamentos = () => {
  const navigate = useNavigate();

  const { currentUser, loading, setLoading } = useContext(UserContext);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const getAgendamentos = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/agendamentos/user/${currentUser.uid}`
      );

      setAgendamentos(res.data);
      setLoading(false);
    };

    getAgendamentos();
  }, []);

  return (
    <div style={{ marginBottom: "80px" }}>
      <Header />
      <AutoCenter>
        <h1 style={{ color: "black" }}>Meus agendamentos</h1>
      </AutoCenter>

      {agendamentos?.length > 0 ? (
        <h1>
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
        </h1>
      ) : (
        <AutoCenter>
          <h2 stlye={{ marginTop: "15px" }}>
            Você não possui nenhum agendamento
          </h2>
        </AutoCenter>
      )}
    </div>
  );
};

export default Agendamentos;
