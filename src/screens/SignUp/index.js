import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {UserContext} from '../../contexts/UserContext';

import {
  Container,
  FormArea,
  CustomButton,
  CustomButtonText,
  SignMessage,
  SignMessageText,
  SignMessageTextBold,
} from './styles';

import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';
import InputField from '../../components/InputField';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

const SignUp = () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const navigation = useNavigation();

  const handleSignPress = async () => {
    if (nameField === '' || emailField.trim() !== '' || passwordField !== '') {
      const response = await Api.signUp(nameField, emailField, passwordField);

      if (response.token) {
        await AsyncStorage.setItem('token', response.token);

        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: response.data.avatar,
          },
        });

        navigation.reset({
          routes: [{name: 'MainTab'}],
        });
      } else {
        // eslint-disable-next-line no-alert
        alert(`Error: ${response.error}`);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Preencha todos os campos!');
    }
  };

  const handleSignMessagePress = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <FormArea>
        <InputField
          IconSvg={PersonIcon}
          placeholder="Digite seu nome completo"
          value={nameField}
          onChangeText={(text) => setNameField(text)}
        />
        <InputField
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={(text) => setEmailField(text)}
        />
        <InputField
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(text) => setPasswordField(text)}
          password
        />

        <CustomButton onPress={handleSignPress}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </FormArea>

      <SignMessage onPress={handleSignMessagePress}>
        <SignMessageText>Já possui uma conta?</SignMessageText>
        <SignMessageTextBold>Faça Login</SignMessageTextBold>
      </SignMessage>
    </Container>
  );
};

export default SignUp;
