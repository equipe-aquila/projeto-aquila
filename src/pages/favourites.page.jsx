import { NavBar, Image, AutoCenter } from "antd-mobile";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import PrestadorCard from "../components/prestador-card.component";
import { UserContext } from "../contexts/user.context";

const Favourites = () => {
  const navigate = useNavigate();
  const { currentUser, loading, setLoading } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFavourites = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`
      );
      setLoading(false);

      setFavourites(res.data);
    };

    getFavourites();
  }, []);

  const handlePrestadorClick = (id) => {
    navigate(`/prestador/${id}`);
  };

  return (
    <>
      <Header />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <AutoCenter>
            <h1>Meus Favoritos</h1>
          </AutoCenter>
          {favourites.map((prestador, index) => {
            return (
              <Fragment key={prestador.id}>
                {index === 0 ? <hr /> : null}
                <PrestadorCard
                  prestador={prestador}
                  onClick={handlePrestadorClick}
                />
                <hr />
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Favourites;
