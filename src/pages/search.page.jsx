import { NavBar, SearchBar } from "antd-mobile";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PrestadorCard from "../components/prestador-card.component";

const Search = () => {
  const navigate = useNavigate();
  const [prestadores, setPrestadores] = useState([]);

  const getPrestadores = async () => {
    const prestadores = await getPrestadoresApi();
    setPrestadores(prestadores);
  };

  const getPrestadoresApi = async () => {
    const res = await axios(
      "https://projeto-aquila.herokuapp.com/api/prestadores/"
    );
    return res.data;
  };
  const handlePrestadorClick = (id) => {
    navigate(`/prestador/${id}`);
  };

  const aa = async (e) => {
    let _prestadores = [];
    if (e.length <= 0) {
      return getPrestadores();
    }

    if (
      prestadores.length === 1 &&
      prestadores[0].name === "Nenhum prestador encontrado"
    ) {
      const prestadoresApi = await getPrestadoresApi();
      if (prestadoresApi.length > 0) {
        _prestadores = prestadoresApi;
      }
    } else {
      _prestadores = prestadores;
    }

    const filteredPrestadores = _prestadores.filter(
      (prestador) => prestador.name.toLowerCase().indexOf(e.toLowerCase()) > -1
    );

    if (filteredPrestadores.length <= 0) {
      return setPrestadores([{ name: "Nenhum prestador encontrado" }]);
    }

    setPrestadores(filteredPrestadores);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: 90,
          zIndex: 999999
        }}
      >
        <SearchBar
          placeholder="Pesquisar estabelecimento"
          onChange={aa}
          onFocus={() => getPrestadores()}
          onBlur={() => setPrestadores([])}
        />
        {prestadores.slice(0, 5).map((prestador) => {
          return (
            <PrestadorCard
              key={prestador.id}
              prestador={prestador}
              onClick={handlePrestadorClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
