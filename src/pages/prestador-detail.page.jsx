import {
  AutoCenter,
  Avatar,
  Card,
  Divider,
  Grid,
  NavBar,
  Space,
  Image
} from "antd-mobile";
import { HeartFill, HeartOutline } from "antd-mobile-icons";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Header } from "../components/Header";
import ServicoCard from "../components/servico-card.component";
import ColaboradorCard from "../components/colaborador-card.component";
import { PrestadorContext } from "../contexts/prestador.context";
import { UserContext } from "../contexts/user.context";

const PrestadorDetail = () => {
  const { id } = useParams();

  const [favourites, setFavourites] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [isFavourite, setIsFavorite] = useState(false);

  const {
    selectedPrestador,
    setSelectedPrestador,
    selectedFunc,
    setSelectedFunc
  } = useContext(PrestadorContext);
  const { currentUser, setLoading } = useContext(UserContext);

  const navigate = useNavigate();

  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const getPrestador = async () => {
      const res = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/prestadores/${id}`
      );
      setSelectedPrestador(res.data);
    };

    const getFuncionarios = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/prestadores/${id}/colaboradores`
      );
      setFuncionarios(response.data[0].colaboradores);

      setLoading(false);
    };

    const getFavourites = async () => {
      const res = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`
      );

      setFavourites(res.data);
      if (res.data.length < 0) return;
      const isFavourite = res.data.some(
        (prestador) => prestador.id === selectedPrestador.id
      );
      setIsFavorite(isFavourite);
    };

    const getServicos = async () => {
      const res = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/prestadores/${id}/servicos`
      );

      setServicos(res.data);
    };

    getPrestador();
    getFavourites();
    getServicos();
    getFuncionarios();
  }, []);

  const handleFavoritoAdd = async () => {
    await axios.post(
      `https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`,
      {
        prestadorId: selectedPrestador.id
      }
    );
    setIsFavorite(true);
  };

  const handleFavoritoRemove = async () => {
    await axios.delete(
      `https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`,
      {
        prestadorId: selectedPrestador.id
      }
    );
    setIsFavorite(false);
  };

  const handleServicoClick = (id) => {
    navigate(`/servico/${id}`);
  };

  const [selectedServices, setSelectedServices] = useState([]);

  return (
    <>
      {selectedPrestador && (
        <>
          <Header />

          <AutoCenter>
            <h1 style={{ color: "black", flex: 1, flexDirection: "row" }}>
              {selectedPrestador.name}{" "}
              <span>
                {isFavourite ? (
                  <HeartFill
                    style={{ cursor: "pointer" }}
                    color="red"
                    onClick={handleFavoritoRemove}
                  />
                ) : (
                  <HeartOutline
                    style={{ cursor: "pointer" }}
                    onClick={handleFavoritoAdd}
                  />
                )}
              </span>
            </h1>
          </AutoCenter>

          <Card style={{ marginRight: "40px", marginLeft: "40px" }}>
            <Grid columns={2}>
              <Grid.Item>
                <Avatar src="./logo-placeholder-image.png" />
              </Grid.Item>
              <Grid.Item style={{ justifySelf: "right" }}>
                <Space direction="vertical" style={{ textAlign: "right" }}>
                  <font style={{ fontSize: "medium", fontWeight: "bold" }}>
                    {selectedPrestador.name}
                  </font>
                  <font>
                    {selectedPrestador.rua
                      .concat(", ")
                      .concat(selectedPrestador.bairro)
                      .concat(" - ")
                      .concat(selectedPrestador.cidade)
                      .concat(", ")
                      .concat(selectedPrestador.estado)}
                  </font>
                </Space>
              </Grid.Item>
            </Grid>
          </Card>
          {selectedServices && selectedServices.length > 0 && (
            <div>
              <Divider style={{ color: "black" }}>Serviços</Divider>
              <AutoCenter>
                <span
                  style={{
                    cursor: "pointer",
                    color: "purple",
                    fontSize: 16,
                    border: "1px solid #ddd",
                    padding: 5
                  }}
                  onClick={() => {
                    setSelectedServices([]);
                    setSelectedFunc(null);
                  }}
                >
                  Voltar
                </span>
              </AutoCenter>
            </div>
          )}

          {selectedServices &&
            selectedServices.length > 0 &&
            selectedServices?.map((servico) => {
              return (
                <ServicoCard
                  key={servico.id}
                  servico={servico}
                  onClick={handleServicoClick}
                />
              );
            })}
          {(!selectedServices || selectedServices.length <= 0) &&
            funcionarios &&
            funcionarios.length > 0 && (
              <Divider style={{ color: "black" }}>Funcionarios</Divider>
            )}
          {(!selectedServices || selectedServices.length <= 0) &&
            funcionarios &&
            funcionarios.length > 0 &&
            funcionarios?.map((funcionario) => (
              <ColaboradorCard
                key={funcionario.id}
                onClick={() => {
                  setSelectedServices(funcionario.servicos);
                  setSelectedFunc(funcionario);
                }}
                colaborador={funcionario}
              />
            ))}
        </>
      )}
    </>
  );
};

export default PrestadorDetail;
