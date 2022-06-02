import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container,InputArea,CustomButton,CustomButtonText,SignMessageButton,SignMessageButtonText,SignMessageButtonTextBold } from './styles';
import SignInput from '../../components/SignInput';
import AquilaLogo from '../../assets/Aquila-Logo.svg';
import EmailIcon from '../../assets/email.svg';
import PersonIcon from '../../assets/person.svg';
import LockIcon from '../../assets/lock.svg'; 
export default () => {
    const navigation = useNavigation();
    const [nameField,setNameField] = useState('');
    const [emailField,setEmailField] = useState('');
    const [passwordField,setPasswordField] = useState('');

    const handleSignClick = () => {
        
    }
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name:'SignIn'}]
        });
    }
    return (
        <Container>
            <AquilaLogo width="100%" height="160"/>

            <InputArea>
            <SignInput 
                IconSvg={PersonIcon}
                placeholder="Digite o seu nome"
                value = {nameField}
                onChangeText={t=>setNameField(t)}
                />
                <SignInput 
                IconSvg={EmailIcon}
                placeholder="Digite o seu e-mail"
                value = {emailField}
                onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                IconSvg={LockIcon}
                placeholder="Digite sua senha"
                value = {passwordField}
                onChangeText={t=>setPasswordField(t)}
                password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça o Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}