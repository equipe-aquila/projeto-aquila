import React, { useContext, useEffect, useState } from 'react';
import { AutoCenter, Avatar, Button, Form, Input, Space } from 'antd-mobile';
import { UserContext } from '../contexts/user.context';
import { signOutUser } from '../utils/firebase/firebase.utils';
import axios from 'axios';

const EditProfile = () => {
    const { currentUser } = useContext(UserContext);
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const getUserData = async () => {
            const res = await axios.get(`https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}`);
            setUserData(res.data);
        };

        getUserData();
    }, []);

    const [rua, setRua] = useState(userData.rua);
    const [numero, setNumero] = useState(userData.numero);
    const [bairro, setBairro] = useState(userData.bairro);
    const [cidade, setCidade] = useState(userData.cidade);
    const [estado, setEstado] = useState(userData.estado);
    const [cep, setCEP] = useState(userData.cep);

    useEffect(() => {
        setRua(userData.rua);
        setNumero(userData.numero);
        setBairro(userData.bairro);
        setCidade(userData.cidade);
        setEstado(userData.estado);
        setCEP(userData.cep);
    }, [userData]);

    const handleProfileUpdate = async () => {
        await axios.put(`https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}`, {
            rua,
            numero,
            bairro,
            cidade,
            estado,
            cep
        });
    }

    return (
        <>
        <AutoCenter>
            <Space direction='vertical' style={{marginTop: '3rem'}}>
                <AutoCenter>
                    <Avatar src={currentUser.photoURL} style={{ '--size': '64px' }} />
                </AutoCenter>
                <AutoCenter>
                    <h1>{currentUser.displayName}</h1>
                </AutoCenter>
                <Form
                layout='horizontal'
                footer={
                    <Button block size='large' color='primary' onClick={handleProfileUpdate}>
                    Salvar
                    </Button>
                }
                fields={[
                    {
                        name: ['street'],
                        value: rua
                    },
                    {
                        name: ['number'],
                        value: numero
                    },
                    {
                        name: ['neighborhood'],
                        value: bairro
                    },
                    {
                        name: ['city'],
                        value: cidade
                    },
                    {
                        name: ['state'],
                        value: estado
                    },
                    {
                        name: ['zip'],
                        value: cep
                    },
                    
                ]}
                >
                    <Form.Item name='street' label='Rua'>
                        <Input placeholder='Rua' onChange={(value) => setRua(value)}/>
                    </Form.Item>
                    <Form.Item name='number' label='Número' initialValue={numero}>
                        <Input placeholder='Número' onChange={(value) => setNumero(value)}/>
                    </Form.Item>
                    <Form.Item name='neighborhood' label='Bairro' initialValue={bairro}>
                        <Input placeholder='Bairro' onChange={(value) => setBairro(value)}/>
                    </Form.Item>
                    <Form.Item name='city' label='Cidade' initialValue={cidade}>
                        <Input placeholder='Cidade' onChange={(value) => setCidade(value)}/>
                    </Form.Item>
                    <Form.Item name='state' label='Estado' initialValue={estado}>
                        <Input placeholder='Estado' onChange={(value) => setEstado(value)}/>
                    </Form.Item>
                    <Form.Item name='zip' label='CEP' initialValue={cep}>
                        <Input placeholder='CEP' onChange={(value) => setCEP(value)}/>
                    </Form.Item>
                </Form>
                <Button block size='large' color='danger' onClick={signOutUser}>Sair</Button>
            </Space>
        </AutoCenter>
        </>
    );
}

export default EditProfile;
