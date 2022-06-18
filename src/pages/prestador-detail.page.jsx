import { Button, NavBar, Space } from 'antd-mobile';
import { HeartFill, HeartOutline } from 'antd-mobile-icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PrestadorContext } from '../contexts/prestador.context';
import { UserContext } from '../contexts/user.context';

const PrestadorDetail = () => {
    const {id} = useParams();

    const [favourites, setFavourites] = useState([]);

    const {selectedPrestador, setSelectedPrestador} = useContext(PrestadorContext);
    const {currentUser} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        const getPrestador = async () => {
            const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/prestadores/${id}`);
            const getFavourites = async () => {
                const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`);
    
                setFavourites(res.data);
            }
            
            setSelectedPrestador(res.data);
            getFavourites();
        };

        getPrestador();
    }, []);

    const handleFavoritoAdd = async () => {
        await axios.post(`https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`, {
            'prestadorId': selectedPrestador.id
        });
    }

    return (
        <>
        {
            selectedPrestador && (
                <>
                <NavBar
                    right={
                        favourites.includes(selectedPrestador) ? (
                            <HeartOutline fontSize='180%' onClick={handleFavoritoAdd}/>
                        ) : (
                            <HeartFill color='var(--adm-color-danger)' fontSize='180%' onClick={handleFavoritoAdd}/>
                        )
                    }
                    onBack={() => navigate(-1)}
                >
                    {selectedPrestador.name}
                    </NavBar>
                <Space direction='vertical'>
                    {selectedPrestador.name}
                </Space>
                </>
            )
        }
        </>
    );
}

export default PrestadorDetail;
