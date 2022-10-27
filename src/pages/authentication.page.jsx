import axios from "axios";
import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGoogleRedirect } from "../utils/firebase/firebase.utils";
import GoogleButton from "react-google-button";
import { Image} from "antd-mobile";
import {
    HeroContainer,
    HeroContent,
    HeroContentText,
    HeroTitle,
    HeroTitleText,
    HeroText,
    ImgHero,

} from './Hero.Styles';
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
                     <GoogleButton className="google" style={{borderRadius:"3px"}} label="Entrar com Google" onClick={signInWithGoogleRedirect}/>
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
