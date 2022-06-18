import { NavBar } from 'antd-mobile';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PrestadorCard from '../components/prestador-card.component';
import { UserContext } from '../contexts/user.context'

const Favourites = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const getFavourites = async () => {
            const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`);

            setFavourites(res.data);
        }

        getFavourites();
    }, []);

    const handlePrestadorClick = (id) => {
        navigate(`/prestador/${id}`);
    }

    return (
        <>
        <NavBar onBack={() => navigate(-1)}>Favoritos</NavBar>
        {favourites.map((prestador) => {
            return (
                <PrestadorCard key={prestador.id} prestador={prestador} onClick={handlePrestadorClick}/>
            );
        })}
        </>
    );
}

export default Favourites;
