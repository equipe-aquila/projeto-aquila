import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Modal } from "../../../components/Modal/Modal";
import { PrestadorContext } from "../../../contexts/prestador.context";
import { UserContext } from "../../../contexts/user.context";
import "./comprovantes.css";

export default function Comprovantes() {
  const [agendamentosPagos, setAgendamentosPagos] = useState([]);
  const { selectedPrestador } = useContext(PrestadorContext);

  const getFuncionarios = async () => {
    const response = await axios.get(
      `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/prestadores/${selectedPrestador.id}/colaboradores`
    );

    return response.data[0].colaboradores;
  };

  const { setLoading } = useContext(UserContext);

  useEffect(() => {
    const getAgendamentos = async () => {
      setLoading(true);

      const colaboradores = await getFuncionarios();
      let agendamentos = [];

      for await (const colaborador of colaboradores) {
        const res = await axios.get(
          `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/colaborador/${colaborador.id}/agendamentos`
        );

        for await (const agendamento of res.data.filter(
          (agendamento) => agendamento.pago
        )) {
          const item = await axios.get(
            `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/agendamentos/${agendamento.id}`
          );
          agendamentos.push(item.data);
        }
      }

      setAgendamentosPagos(agendamentos);
      setLoading(false);
    };
    setLoading(false);

    getAgendamentos();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);

  return (
    <div>
      <Header navigation={null} />
      <Modal show={showModal} handleClose={handleClose}>
        <div className="payment-receipt-borderless">
          <div className="payment-padding">
            <p className="receipt-title">
              Comprovante de pagamento
              <span className="receipt-date">
                {new Date().toLocaleDateString("pt-br")}
              </span>
            </p>

            <span>
              <strong>Valor: </strong>{" "}
              {selectedAgendamento?.servico?.preco.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL"
              })}
            </span>
            <span>
              <strong>Tipo de pagamento: </strong> Cartão de crédito
            </span>
            <div className="strike">
              <span>Origem</span>
            </div>

            <span>
              <strong>Efetuado por: </strong> {selectedAgendamento?.user?.name}
            </span>
            <span>
              <strong>Email: </strong> {selectedAgendamento?.user?.email}
            </span>
            <div className="strike">
              <span>Destino</span>
            </div>

            <span>
              <strong>Enviado para: </strong>{" "}
              {selectedAgendamento?.colaborador?.nomeColaborador}
            </span>

            <span></span>
            <div className="strike">
              <span>Descrição dos serviços</span>
            </div>
            <span>
              <strong>Serviço: </strong> {selectedAgendamento?.servico?.titulo}
            </span>

            <div>
              <span>
                <strong>Detalhamento</strong>
              </span>
              <div className="receipt-list">
                {selectedAgendamento?.servico?.descricao
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
      </Modal>
      {
        <div className="comprovantes-container">
          <div className="comprovantes-title">
            <h1>Comprovantes de pagamento</h1>
          </div>
          <div className="comprovantes-list">
            {agendamentosPagos.map((agendamento) => {
              return (
                <div
                  className="comprovante-item"
                  onClick={() => {
                    setSelectedAgendamento(agendamento);
                    setShowModal(true);
                  }}
                >
                  <div className="comprovante-item-title">
                    <h2>
                      {agendamento.servico.titulo} -{" "}
                      {new Date().toLocaleDateString("pt-br")}
                    </h2>
                  </div>
                  <div className="comprovante-item-description">
                    <strong>Descrição:</strong>
                    <p>{agendamento.servico.descricao}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
}
