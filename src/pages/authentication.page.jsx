import axios from "axios";

import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGoogleRedirect } from "../utils/firebase/firebase.utils";
import GoogleButton from "react-google-button";
import { AutoCenter, Space } from "antd-mobile";

import styles0 from '../modules/reset.css'
import styles from '../modules/authentication.modules.css'
import logo from '../components/img/logo.png'

const Authenticate = () => {
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

    return (
        <div>
            <AutoCenter>
                <Space direction="vertical">
                    <AutoCenter>
                        <div id="painel">
                            <h1 id="fantasia"><img src={logo} alt="Áquila"/></h1>
                            <div id="caixa">
                                <form method="" action="">
                                    <h2 id="tituloLogin">Login</h2>
                                    <label for="text-email">E-mail</label>
                                    <input type="text" id="text-email"/>
                                    <label for="text-password">Senha</label>
                                    <input type="password" id="text-password"/>
                                    <input type="checkbox" id="logado" value="manterLogado" name="logado"/>
                                    <label id="labelLogado" for="logado">Manter-me logado</label>
                                    <center>
                                        <input type="submit" value="Entrar" id="botao-entrar"/>
                                        <GoogleButton label="Entrar com Google" id="googleButton" onClick={signInWithGoogleRedirect}></GoogleButton>
                                    </center>
                                    <div id="cadastro">
                                        <label for="botao-cadastrar" id="labelCadastrar">Ainda não tem conta?</label>
                                        <input type="submit" value="Cadastrar-se" id="botao-cadastrar"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </AutoCenter>
                </Space>
            </AutoCenter>
        </div>
    );
}

export default Authenticate;
