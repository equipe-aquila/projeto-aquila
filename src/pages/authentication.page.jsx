import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword
} from "../utils/firebase/firebase.utils";
import GoogleButton from "react-google-button";
import { Form, Input, Button, Image, AutoCenter, Divider } from "antd-mobile";
import { UserContext } from "../contexts/user.context";

import {
  HeroContainer,
  HeroContent,
  HeroContentText,
  HeroTitle,
  HeroText,
  ImgHero,
  ButtonContent
} from "./Hero.Styles";
import { PrestadorContext } from "../contexts/prestador.context";
import { SectionSpliter } from "../components/SectionSpliter/SectionSpliter";

const Authenticate = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: ""
  });

  const { setIsPrestador, isPrestador } = useContext(UserContext);
  const { setSelectedPrestador } = useContext(PrestadorContext);
  const { email, password } = formFields;

  useEffect(() => {
    const authenticate = async () => {
      const response = await getRedirectResult(auth);

      if (response) {
        if (!isPrestador) {
          return await axios.post(
            "https://projeto-aquila.herokuapp.com/api/users/",
            {
              id: response.user.uid,
              name: response.user.displayName,
              email: response.user.email
            }
          );
        }

        const userLocation = JSON.parse(localStorage.getItem("userLocation"));
        const _response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.latitude},${userLocation.longitude}&key=AIzaSyCldnMI_1AAYc-rrIkTqgAaWnEIcudlDzA`
        );
        const json = await _response.json();
        const address = json.results[0].address_components;
        const prestador = await axios.post(
          "https://projeto-aquila.herokuapp.com/api/prestadores/",
          {
            name: response.user.displayName,
            email: response.user.email,
            tipo_pessoa: "F",
            rua: address[1].long_name,
            numero: address[0].long_name,
            bairro: address[2].long_name,
            cidade: address[3].long_name,
            estado: address[4].long_name,
            cep: address[5].long_name
          }
        );
        setSelectedPrestador(prestador.data);
      }
    };

    authenticate();
  }, []);

  const handleChange = (v) => {
    const [name, value] = Object.entries(v)[0];
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("senha errada");
          break;
        case "auth/user-not-found":
          alert("usuário não está cadastrado");
          break;
        default:
          alert("occoreu um erro");
          break;
      }
    }
  };

  const userSignIn = () => {
    setIsPrestador(false);
    signInWithGoogleRedirect();
  };

  const prestadorSignIn = () => {
    setIsPrestador(true);
    localStorage.setItem("isPrestador", true);
    signInWithGoogleRedirect();
  };

  return (
    <div style={{ margin: "0", padding: "0" }}>
      <HeroContainer>
        <HeroContent>
          <HeroContentText>
            <HeroTitle>
              <Image width={100} src="./aquilalogo.png" alt="" />
            </HeroTitle>
            <HeroText>
              Com Áquila você fica mais bonito! <br></br>Cadastre-se e encontre
              o serviço estético mais perto de você!
            </HeroText>
            <ButtonContent>
              <h1>Faça seu login</h1>
              <div>
                <h1>Cliente</h1>
                <GoogleButton
                  className="google"
                  style={{ borderRadius: "3px" }}
                  label="Eu sou um cliente"
                  onClick={userSignIn}
                />
              </div>
              <SectionSpliter text={"Ou logue como"} />
              <div>
                <h1>Prestador</h1>

                <GoogleButton
                  className="google"
                  style={{ borderRadius: "3px" }}
                  label="Eu sou um prestador"
                  onClick={prestadorSignIn}
                />
              </div>
            </ButtonContent>
          </HeroContentText>
          <ImgHero>
            <Image size="large" width={500} src="./imghero.svg" alt="" />
          </ImgHero>
        </HeroContent>
      </HeroContainer>
    </div>
  );
};

export default Authenticate;
