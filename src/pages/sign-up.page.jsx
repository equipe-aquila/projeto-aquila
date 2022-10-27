import axios from "axios";

import { Form, Input, Button } from 'antd-mobile'
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;


  const handleChange = (v) => {
    const [name, value] = Object.entries(v)[0];
    setFormFields({...formFields, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
        alert("Senhas não conferem");
        return;
    }

    try {
        const response = await createAuthUserWithEmailAndPassword(email, password);
        
        await axios.post('https://projeto-aquila.herokuapp.com/api/users/', {
            'id': response.user.uid,
            'name': displayName,
            'email': email
        });

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
        <Form
            footer={
                <Button block type='submit' color='primary' onClick={handleSubmit} size='large'>
                  Registrar
                </Button>
              }
              onValuesChange={handleChange}
        >
            <Form.Item
                label='Nome'
                name='displayName'
                rules={[{ required: true, message: 'Nome é um campo obrigatório' }]}
            >
                <Input placeholder='Nome' value={displayName}/>
            </Form.Item>
            <Form.Item
                name='email'
                label='Email'
                rules={[{ required: true, message: 'Email é um campo obrigatório' }]}
            >
                <Input placeholder='Email' value={email}/>
            </Form.Item>
            <Form.Item
                name='password'
                label='Senha'
                rules={[{ required: true, message: 'Senha é um campo obrigatório' }]}
            >
                <Input type='password' placeholder='Senha' value={password}/>
            </Form.Item>
            <Form.Item
                name='confirmPassword'
                label='Confirmar senha'
                rules={[{ required: true, message: 'Confirmar senha é um campo obrigatório' }]}
            >
                <Input type='password' placeholder='Confirmar senha' value={confirmPassword}/>
            </Form.Item>
        </Form>
    </>
  );
};

export default SignUp;
