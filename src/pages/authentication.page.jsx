import axios from "axios";

import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGoogleRedirect } from "../utils/firebase/firebase.utils";
import GoogleButton from "react-google-button";
import { AutoCenter, Space } from "antd-mobile";

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
                        <h1>Áquila</h1>
                    </AutoCenter>
                    <GoogleButton label="Entrar com Google" onClick={signInWithGoogleRedirect}></GoogleButton>
                </Space>
            </AutoCenter>
        </div>
    );
}

export default Authenticate;
