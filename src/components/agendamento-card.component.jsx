import { useNavigate } from 'react-router';
import { Card, Grid, Space } from "antd-mobile";
import { CalendarOutline, CheckCircleFill, ClockCircleOutline } from "antd-mobile-icons";
import { useEffect, useState } from 'react';
import axios from 'axios';

const AgendamentoCard = ({agendamentoId}) => {
    const navigate = useNavigate();
    const [agendamento, setAgendamento] = useState(
        {
            status: false,
            data: null,
            prestador: {
                name: null
            },
            servico: {
                name: null,
                preco: 0
            },
        }
    );

    useEffect(() => {
        const getAgendamento = async () => {
            const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/agendamentos/${agendamentoId}`);

            setAgendamento(res.data);
        }

        getAgendamento();
    }, []);

    console.log(agendamento);

    return (
        <Card onClick={agendamento.status ? ('') : () => navigate(`/payment`, {state: agendamento})}>
            <Grid columns={2}>
                <Grid.Item style={{alignSelf: 'center', justifySelf: 'left'}}>
                    <Space direction='vertical'>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <CalendarOutline />
                            <span style={{fontSize: 'medium', fontWeight: 'bold', padding: '.3rem'}}>{agendamento.data}</span>
                        </div>
                        {
                            agendamento.status ?
                            (
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <CheckCircleFill color='green' />
                                    <span style={{fontSize: 'small', fontWeight: 'lighter', padding: '.3rem'}}>Pago</span>
                                </div>
                            ) : (
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <ClockCircleOutline />
                                    <span style={{fontSize: 'small', fontWeight: 'lighter', padding: '.3rem'}}>Aguardando pagamento</span>
                                </div>
                            )
                        }
                    </Space>
                </Grid.Item>
                <Grid.Item>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                        <span style={{fontSize: 'medium', fontWeight: 'bold', padding: '.3rem'}}>
                            {agendamento.prestador.name}
                        </span>
                        <span style={{fontSize: 'medium', fontWeight: 'bold', padding: '.3rem'}}>
                            {agendamento.servico.titulo}
                            ({agendamento.servico.preco.toLocaleString('pt-BR', {currency: 'BRL', style: 'currency'})})
                        </span>
                    </div>
                </Grid.Item>
            </Grid>
        </Card>
    );
}

export default AgendamentoCard;
