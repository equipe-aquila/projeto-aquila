import { Avatar, Card, Divider, Grid, NavBar, Space } from 'antd-mobile';
import { HeartFill, HeartOutline } from 'antd-mobile-icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ServicoCard from '../components/servico-card.component';
import { PrestadorContext } from '../contexts/prestador.context';
import { UserContext } from '../contexts/user.context';

const PrestadorDetail = () => {
    const {id} = useParams();

    const [favourites, setFavourites] = useState([]);
    const [servicos, setServicos] = useState([]);

    const {selectedPrestador, setSelectedPrestador} = useContext(PrestadorContext);
    const {currentUser} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        const getPrestador = async () => {
            const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/prestadores/${id}`);
            setSelectedPrestador(res.data);
        }

        const getFavourites = async () => {
            const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`);

            setFavourites(res.data);
        }

        const getServicos = async () => {
            const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/prestadores/${id}/servicos`);

            setServicos(res.data);
        }

        getPrestador();
        getFavourites();
        getServicos();
    }, []);

    const handleFavoritoAdd = async () => {
        await axios.post(`https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`, {
            'prestadorId': selectedPrestador.id
        });
    }

    const handleFavoritoRemove = async () => {
        await axios.delete(`https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}/favoritos`, {
            'prestadorId': selectedPrestador.id
        });
    }

    const handleServicoClick = (id) => {
        navigate(`/servico/${id}`)
    }

    return (
        <>
        {
            selectedPrestador && (
                <>
                <NavBar
                    right={
                        favourites.some(prestador => prestador.id === selectedPrestador.id) ? (
                            <HeartFill color='var(--adm-color-danger)' fontSize='180%' onClick={handleFavoritoRemove}/>

                        ) : (
                            <HeartOutline fontSize='180%' onClick={handleFavoritoAdd}/>
                        )
                    }
                    onBack={() => navigate(-1)}
                >
                    {selectedPrestador.name}
                </NavBar>

                <Card>
                    <Grid columns={2}>
                        <Grid.Item>
                            <Avatar src='https://img.freepik.com/free-vector/vintage-barbershop-logo-template_441059-26.jpg?w=2000'/>
                        </Grid.Item>
                        <Grid.Item style={{justifySelf: 'right'}}>
                            <Space direction='vertical' style={{textAlign: 'right'}}>
                                <font style={{fontSize: 'medium', fontWeight: 'bold'}}>
                                    {selectedPrestador.name}
                                </font>
                                <font>
                                    {
                                        selectedPrestador.rua
                                        .concat(', ')
                                        .concat(selectedPrestador.bairro)
                                        .concat(' - ')
                                        .concat(selectedPrestador.cidade)
                                        .concat(', ')
                                        .concat(selectedPrestador.estado)
                                    }
                                </font>
                            </Space>
                        </Grid.Item>
                    </Grid>
                </Card>
                <Divider>Serviços</Divider>
                {servicos.map((servico) => {
                    return (
                        <ServicoCard key={servico.id} servico={servico} onClick={handleServicoClick}/>
                    );
                })}
                </>
            )
        }
        </>
    );
}

export default PrestadorDetail;
