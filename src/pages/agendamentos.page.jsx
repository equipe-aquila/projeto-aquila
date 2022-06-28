import { AutoCenter, NavBar } from 'antd-mobile';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AgendamentoCard from '../components/agendamento-card.component';
import { UserContext } from '../contexts/user.context';

const Agendamentos = () => {
    const navigate = useNavigate();

    const {currentUser} = useContext(UserContext);
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        const getAgendamentos = async () => {
            const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/agendamentos/user/${currentUser.uid}`);

            setAgendamentos(res.data);
        }

        getAgendamentos();
    }, []);

    return (
        <div>
            <NavBar onBack={() => navigate(-1)}>
                Agendamentos
            </NavBar>
            {agendamentos.length > 0 ? (
                <h1>{agendamentos.map((agendamento, index)=> {
                    return (
                        <AgendamentoCard key={index} agendamentoId={agendamento.id}/>
                    );
                })}</h1>
            ) : (
                <AutoCenter><h2 stlye={{marginTop: '15px'}}>Você não possui nenhum agendamento</h2></AutoCenter>
            )}
        </div>
    );
}

export default Agendamentos;
