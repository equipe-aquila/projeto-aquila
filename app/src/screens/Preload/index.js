import React, {useEffect} from "react";
import { Container,LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import AquilaLogo from '../../assets/Aquila-Logo.svg'

import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api';

// import AquilaLogo from '../../assets/Aquila-Logo.svg';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token) {
                let res = await Api.checkToken(token);
                if(res.token) {

                    await AsyncStorage.setItem('token', res.token);

                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: res.data.avatar
                        }
                    });

                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });

                } else {
                    navigation.navigate('SignIn');
                }
            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);

    return (
        <Container>
            <AquilaLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}