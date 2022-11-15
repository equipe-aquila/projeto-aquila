import axios from "axios";
import { useEffect, useState } from "react";
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGoogleRedirect, signInAuthUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";
import GoogleButton from "react-google-button";
import { Form, Input, Button, Image, AutoCenter} from "antd-mobile";
import {
    HeroContainer,
    HeroContent,
    HeroContentText,
    HeroTitle,
    HeroText,
    ImgHero,

} from './Hero.Styles';

const Authenticate = () => {
    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formFields;

    useEffect(() => {
        const authenticate = async () => {
            const response = await getRedirectResult(auth);

            if(response) {
                await axios.post('https://projeto-aquila.herokuapp.com/api/users/', {
                    'id': response.user.uid,
                    'name': response.user.displayName,
                    'email': response.user.email
                });
            }
        }

        authenticate();
    }, []);

    const handleChange = (v) => {
        const [name, value] = Object.entries(v)[0];
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await signInAuthUserWithEmailAndPassword(email, password);
        } catch (error) {
          switch(error.code) {
            case 'auth/wrong-password':
                alert('senha errada');
                break;
            case 'auth/user-not-found':
                alert('usuário não está cadastrado');;
                break;
            default:
                alert('occoreu um erro');
                break;
          }
        }
      };

    return (
        <div style={{margin: "0",padding:"0"}}>
        <HeroContainer>
            <HeroContent>
                <HeroContentText>
                        <HeroTitle>
                            <Image width={100} src="./aquilalogo.png" alt="" />
                        </HeroTitle>
                     <HeroText>
                        <i> Com Áquila você fica mais bonito! <br></br>Cadastre-se e encontre o serviço estético mais perto de você!</i>
                     </HeroText>
                     <Form
                        footer={
                            <Button block type='submit' color='primary' onClick={handleSubmit} size='medium'>
                                Entrar
                            </Button>
                          }
                        onValuesChange={handleChange}
                     >
                        <Form.Item
                            label='Email'
                            name='email'
                            rules={[{ required: true, message: 'Email é um campo obrigatório' }]}
                        >
                            <Input placeholder='email@exemplo.com' value={email}/>
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Senha'
                            rules={[{ required: true, message: 'Senha é um campo obrigatório' }]}
                        >
                            <Input type='password' value={password}/>
                        </Form.Item>
                     </Form>
                     <AutoCenter>
                        <GoogleButton
                            className="google" style={{borderRadius:"3px"}} label="Entrar com Google"
                            onClick={signInWithGoogleRedirect}
                        />
                     </AutoCenter>
                </HeroContentText>
                <ImgHero>
                    <Image size="large" width={500} src="./imghero.svg" alt="" />
                </ImgHero>
            </HeroContent>
        </HeroContainer>
     </div>

    );
}

export default Authenticate;
