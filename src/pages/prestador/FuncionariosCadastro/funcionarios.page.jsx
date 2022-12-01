import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CustomButton } from "../../../components/CustomButton";
import { Header } from "../../../components/Header";
import { Modal } from "../../../components/Modal/Modal";
import { PrestadorContext } from "../../../contexts/prestador.context";
import { UserContext } from "../../../contexts/user.context";
import { DeleteOutline } from "antd-mobile-icons";

import "./funcionarios.css";
import { Divider } from "antd-mobile";
export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const navigation = useNavigate();
  const { setLoading } = useContext(UserContext);

  const { selectedPrestador } = useContext(PrestadorContext);

  const [selectedFunc, setSelectedFunc] = useState(null);

  const getFuncionarios = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/prestadores/${selectedPrestador.id}/colaboradores`
    );
    setFuncionarios(response.data[0].colaboradores);

    setLoading(false);
  };
  useEffect(() => {
    getFuncionarios();
  }, [selectedPrestador]);

  useEffect(() => {
    setDefaultValues();
  }, [selectedFunc]);

  const [showModal, setShowModal] = useState(false);
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [foto_url, setFotoUrl] = useState("");

  const setDefaultValues = () => {
    setNomeColaborador(
      selectedFunc && "nomeColaborador" in selectedFunc
        ? selectedFunc.nomeColaborador
        : ""
    );
    setFotoUrl(
      selectedFunc && "foto_url" in selectedFunc ? selectedFunc.foto_url : ""
    );
    setErrorMsg("");
    setNewServices([]);
    setServiceTitle("");
    setServiceDescription("");
    setServicePrice("");
    setServiceImg("");
  };

  const updateFuncionario = async () => {
    setLoading(true);
    const funcionario = {
      nomeColaborador,
      foto_url
    };

    await axios.put(
      `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/colaborador/${selectedFunc.id}`,
      funcionario
    );
    setSelectedFunc(null);
    setShowModal(false);
    setLoading(false);
  };

  const createFuncionario = async () => {
    setLoading(true);
    const funcionario = {
      nomeColaborador,
      foto_url,
      prestadorId: selectedPrestador.id
    };

    const response = await axios.post(
      `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/colaborador`,
      funcionario
    );
    setSelectedFunc(null);
    setShowModal(false);
    setLoading(false);
    return response.data;
  };

  const handleClose = () => {
    setSelectedFunc(null);
    setShowModal(false);
  };

  const [newServices, setNewServices] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceImg, setServiceImg] = useState("");

  const save = async () => {
    if (nomeColaborador === "")
      return setErrorMsg("O campo nome é obrigatorio");

    setErrorMsg("");
    if (selectedFunc) {
      await updateFuncionario();
      await createServices(selectedFunc.id);
    } else {
      const func = await createFuncionario();
      await createServices(func.id);
    }
    setDefaultValues();
    await getFuncionarios();
  };

  const deleteService = (id) => {
    setLoading(true);
    axios
      .delete(
        `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/servicos/${id}`
      )
      .then(() => {
        getFuncionarios();
        setShowModal(false);
        setSelectedFunc(null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const createServices = async (funcId) => {
    setLoading(true);
    for await (const service of newServices) {
      const _service = {
        titulo: service.titulo,
        descricao: service.descricao,
        preco: service.preco,
        idPrestador: selectedPrestador.id,
        idColaborador: funcId,
        imagem: service.imagem
      };

      await axios.post(
        `http://ec2-54-164-45-9.compute-1.amazonaws.com/api/servicos`,
        _service
      );
    }

    setLoading(false);
  };

  const addNewService = () => {
    if (serviceTitle === "" || serviceDescription === "" || servicePrice === "")
      return;
    setNewServices([
      ...newServices,
      {
        titulo: serviceTitle,
        preco: servicePrice,
        descricao: serviceDescription,
        imagem: serviceImg
      }
    ]);
  };

  return (
    <div>
      <Header navigation={null} />
      <Modal show={showModal} handleClose={handleClose}>
        <h2 style={{ textAlign: "center", paddingTop: "20px" }}>
          {selectedFunc ? "Editar" : "Novo"} Colaborador
        </h2>

        <div className="form-group-prestador">
          <div className="form-group-prestador-input">
            <span>Nome</span>
            <input
              placeholder="Nome"
              value={nomeColaborador}
              onChange={(event) => setNomeColaborador(event.target.value)}
            />
          </div>

          <div className="form-group-prestador-input">
            <span>Foto</span>
            <input
              placeholder="Foto"
              value={foto_url}
              onChange={(event) => setFotoUrl(event.target.value)}
            />
          </div>
          {errorMsg !== "" && (
            <span style={{ color: "red", textAlign: "center" }}>
              {errorMsg}
            </span>
          )}
          <Divider />
          <span style={{ fontSize: 18, fontWeight: "bold" }}>Novo serviço</span>
          <div className="form-group-prestador-input">
            <span>Título</span>
            <input
              placeholder="Título"
              value={serviceTitle}
              onChange={(event) => setServiceTitle(event.target.value)}
            />
          </div>

          <div className="form-group-prestador-input">
            <span>Descrição</span>
            <input
              placeholder="Descrição"
              value={serviceDescription}
              onChange={(event) => setServiceDescription(event.target.value)}
            />
          </div>

          <div className="form-group-prestador-input">
            <span>Preço</span>
            <input
              placeholder="Preço"
              value={servicePrice}
              onChange={(event) => setServicePrice(event.target.value)}
            />
          </div>
          <div className="form-group-prestador-input">
            <span>Imagem</span>
            <input
              placeholder="Imagem"
              value={serviceImg}
              onChange={(event) => setServiceImg(event.target.value)}
            />
          </div>
          <span
            onClick={addNewService}
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              background: "#7f6aab",
              padding: 5,
              cursor: "pointer"
            }}
          >
            Adicionar
          </span>
        </div>
        <div className="table-wrapper-funcionarios">
          <table className="__table">
            <thead>
              <tr className="__tr">
                <th>Título</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {[...(selectedFunc?.servicos || []), ...newServices].map(
                (servico, index) => (
                  <Fragment key={index}>
                    <tr className="__tr">
                      <td className="__td">{servico.titulo}</td>
                      <td className="__td">{servico.descricao}</td>
                      <td className="__td">{servico.preco}</td>
                      <td
                        className="__td"
                        style={{
                          height: "100%"
                        }}
                      >
                        <DeleteOutline
                          style={{
                            cursor: "pointer",
                            color: "red",
                            fontSize: 20,
                            marginLeft: 10
                          }}
                          onClick={() => deleteService(servico.id)}
                        />
                      </td>
                    </tr>
                  </Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="button-save-prestador-h">
          <CustomButton onClick={save}>Salvar</CustomButton>
        </div>
      </Modal>
      <div
        style={{ maginTop: "80px" }}
        className="prestador-homepage-funcionarios"
      >
        <h1 style={{ textAlign: "center" }}>Cadastro dos Colaboradores</h1>
        <div className="prestador-homepage-funcionarios-list">
          {funcionarios?.length < 1 && (
            <h2 style={{ textAlign: "center" }}>
              Nenhum colaborador cadastrado
            </h2>
          )}
          {funcionarios.map((funcionario) => (
            <span
              onClick={() => {
                setSelectedFunc(funcionario);
                setShowModal(true);
              }}
              className="prestador-hompage-funcionario"
              key={funcionario.id}
            >
              {funcionario.nomeColaborador}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px"
          }}
        >
          <CustomButton onClick={() => setShowModal(true)}>
            Novo colaborador
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
