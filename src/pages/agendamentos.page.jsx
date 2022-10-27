import { AutoCenter, NavBar,Image } from 'antd-mobile';
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
        <div style={{marginBottom:"80px",backgroundColor:"#B59EE2"}}>

            <NavBar style={{marginBottom:"12px",marginTop:"12px",zIndex:999999,backgroundColor:"#B59EE2"}} onBack={() => navigate(-1)}> 
            <div style={{display:"flex",justifyContent:"center",backgroundColor:"#B59EE2",}}>
            <Image width={110} src="./aquilalogo.png"></Image>
            </div>
            </NavBar>

            {agendamentos.length > 0 ? (
                <h1>{agendamentos.map((agendamento, index)=> {
                    return (
                        <div style={{display:"flex",justifyContent:"center",paddingLeft:"40px",paddingRight:"40px"}}>
                            <div style={{width:"900px",paddingBottom:"6px"}}>
                        <AgendamentoCard  key={index} agendamentoId={agendamento.id}/>
                        </div>
                        </div>
                    );
                })}</h1>
            ) : (
                <AutoCenter><h2 stlye={{marginTop: '15px'}}>Você não possui nenhum agendamento</h2></AutoCenter>
            )}
        </div>
    );
}

export default Agendamentos;
