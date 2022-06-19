import { Button, Space } from 'antd-mobile';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PrestadorContext } from '../contexts/prestador.context';
import { UserContext } from '../contexts/user.context';

const PrestadorDetail = () => {
    const {id} = useParams();

    const [favourites, setFavourites] = useState([]);

    const {selectedPrestador, setSelectedPrestador} = useContext(PrestadorContext);
    const {currentUser} = useContext(UserContext);

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
                <Space direction='vertical'>
                    {selectedPrestador.name}
                    {
                        favourites.includes(selectedPrestador) ? (
                            <Button color='primary' onClick={handleFavoritoAdd}>Adicionar aos favoritos</Button>
                        ) : (
                            <Button color='danger'>Remover dos favoritos</Button>
                        )
                    }
                </Space>
            )
        }
        </>
    );
}

export default PrestadorDetail;
