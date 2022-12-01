import { AutoCenter, Avatar } from "antd-mobile";
import axios from "axios";
import { EditFill, CalendarOutline } from "antd-mobile-icons";
import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { UserContext } from "../../../contexts/user.context";
import "./homepage.css";
import { useNavigate } from "react-router";
import { PrestadorContext } from "../../../contexts/prestador.context";
import { Modal } from "../../../components/Modal/Modal";
import { CustomButton } from "../../../components/CustomButton";

const Homepage = () => {
  const { setLoading } = useContext(UserContext);
  const { selectedPrestador, setSelectedPrestador } =
    useContext(PrestadorContext);

  const navigation = useNavigate();

  const [photo, setPhoto] = useState(selectedPrestador?.photoURL);

  useEffect(() => {
    setLoading(true);
    if (!photo && selectedPrestador?.photoURL) {
      setPhoto(selectedPrestador.photoURL);
      setLoading(false);
    }
  }, [photo]);
  useEffect(() => {
    getFuncionarios();
    setDefaultValues();
  }, [selectedPrestador]);

  const getFuncionarios = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/prestadores/${selectedPrestador.id}/colaboradores`
    );
    setFuncionarios(response.data[0].colaboradores);

    setLoading(false);
  };

  const setDefaultValues = () => {
    setRua(selectedPrestador?.rua);
    setNumero(selectedPrestador?.numero);
    setBairro(selectedPrestador?.bairro);
    setCidade(selectedPrestador?.cidade);
    setEstado(selectedPrestador?.estado);
    setCEP(selectedPrestador?.cep);
    setName(selectedPrestador?.name);
  };

  const updatePrestador = async () => {
    setLoading(true);
    const prestador = {
      name,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep
    };

    for (let key in prestador) {
      if (!prestador[key]) {
        setLoading(false);
        return setErrorMsg("Preencha todos os campos");
      }
    }

    const { data } = await axios.put(
      `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/prestadores/${selectedPrestador.id}`,
      prestador
    );
    setSelectedPrestador(data);
    setLoading(false);
    setShowModal(false);
  };

  const handleClose = () => {
    setDefaultValues();
    setShowModal(false);
  };

  const [name, setName] = useState(selectedPrestador?.name);
  const [rua, setRua] = useState(selectedPrestador?.rua);
  const [numero, setNumero] = useState(selectedPrestador?.numero);
  const [bairro, setBairro] = useState(selectedPrestador?.bairro);
  const [cidade, setCidade] = useState(selectedPrestador?.cidade);
  const [estado, setEstado] = useState(selectedPrestador?.estado);
  const [cep, setCEP] = useState(selectedPrestador?.cep);

  const [funcionarios, setFuncionarios] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div style={{ marginBottom: "80px" }}>
      <Modal show={showModal} handleClose={handleClose}>
        <h2 style={{ textAlign: "center", paddingTop: "20px" }}>
          Alterar dados
        </h2>

        <div className="form-group-prestador">
          <div className="form-group-prestador-input">
            <span>Nome</span>
            <input
              placeholder="Nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group-prestador-input">
            <span>Rua</span>
            <input
              placeholder="Rua"
              value={rua}
              onChange={(event) => setRua(event.target.value)}
            />
          </div>
          <div className="form-group-prestador-input">
            <span>Número</span>
            <input
              placeholder="Número"
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
            />
          </div>
          <div className="form-group-prestador-input">
            <span>Bairro</span>
            <input
              placeholder="Bairro"
              value={bairro}
              onChange={(event) => setBairro(event.target.value)}
            />
          </div>
          <div className="form-group-prestador-input">
            <span>Cidade</span>
            <input
              placeholder="Cidade"
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
            />
          </div>
          <div className="form-group-prestador-input">
            <span>Estado</span>
            <input
              placeholder="Estado"
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
            />
          </div>
          <div className="form-group-prestador-input">
            <span>CEP</span>
            <input
              placeholder="CEP"
              value={cep}
              onChange={(event) => setCEP(event.target.value)}
            />
          </div>
          {errorMsg !== "" && (
            <span style={{ color: "red", textAlign: "center" }}>
              {errorMsg}
            </span>
          )}
        </div>
        <div className="button-save-prestador-h">
          <CustomButton onClick={updatePrestador}>Salvar</CustomButton>
        </div>
      </Modal>
      <Header navigation={null} />

      <div className="prestador-homepage-wrapper">
        <EditFill
          className="prestador-homepage-edit"
          onClick={() => setShowModal(true)}
        />
        <div className="prestador-homepage-header">
          <Avatar
            src={photo}
            style={{ "--size": "128px", borderRadius: "50%" }}
          />
          <h2 className="prestador-homepage-company-name">{name}</h2>
          <span className="prestador-homepage-address">
            {rua}, {numero}, {bairro} - {cidade}, {estado} - {cep}
          </span>
        </div>
        <div className="prestador-homepage-funcionarios">
          <h2 style={{ textAlign: "center" }}>
            Agendamentos dos colaboradores
          </h2>

          <div className="prestador-homepage-funcionarios-list">
            {funcionarios.length < 1 && (
              <h2 style={{ textAlign: "center" }}>
                Nenhum colaborador cadastrado
              </h2>
            )}
            {funcionarios.map((funcionario) => (
              <span
                onClick={() => navigation(`/appointments/${funcionario.id}`)}
                className="prestador-hompage-funcionario"
                key={funcionario.id}
              >
                <CalendarOutline color="#7f6aab" fontSize={20} />{" "}
                {funcionario.nomeColaborador}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
