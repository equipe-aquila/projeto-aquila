import React, { useState,useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container,InputArea,CustomButton,CustomButtonText,SignMessageButton,SignMessageButtonText,SignMessageButtonTextBold } from './styles';
import {UserContext} from '../../contexts/UserContext'
import Api from '../../Api';
import SignInput from '../../components/SignInput';
import AquilaLogo from '../../assets/Aquila-Logo.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg'; 
export default () => {
    const {dispatch: userDispatch} = useContext(UserContext)
    const navigation = useNavigation();
    const [emailField,setEmailFiel] = useState('FFF');
    const [passwordField,setPasswordField] = useState('FFF');

    const handleSignClick = async () => {
            navigation.reset({
                routes:[{name:'MainTab'}]
            });
        }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name:'SignUp'}]
        });
    }
    return (
        <Container>
            <AquilaLogo width="100%" height="160"/>

            <InputArea>
                <SignInput 
                IconSvg={EmailIcon}
                placeholder="Digite o seu e-mail"
                value = {emailField}
                onChangeText={t=>setEmailFiel(t)}
                />
                <SignInput 
                IconSvg={LockIcon}
                placeholder="Digite sua senha"
                value = {passwordField}
                onChangeText={t=>setPasswordField(t)}
                password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}