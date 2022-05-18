import React from 'react';
import {Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Container} from './styles';

import Api from '../../Api';

const Profile = () => {
  const navigation = useNavigation();

  const handleLogoutClick = async () => {
    await Api.logout();
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <Text>Profile Screen</Text>
      <Button title="sair" onPress={handleLogoutClick} />
    </Container>
  );
};

export default Profile;
