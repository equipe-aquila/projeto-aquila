import React, {useContext} from 'react';
import styled from 'styled-components/native';

import {UserContext} from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
  height: 60px;
  background-color: #333;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CenterTabItem = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid #777;
  margin-top: -20px;
`;

const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 24px;
`;

const CustomTabBar = ({state, navigation}) => {
  const {state: user} = useContext(UserContext);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon
          width="24"
          height="24"
          fill={state.index === 0 ? '#fff' : '#777'}
        />
      </TabItem>

      <TabItem onPress={() => goTo('Search')}>
        <SearchIcon
          width="24"
          height="24"
          fill={state.index === 1 ? '#fff' : '#777'}
        />
      </TabItem>

      <CenterTabItem onPress={() => goTo('Appointments')}>
        <TodayIcon width="32" height="32" fill="#444" />
      </CenterTabItem>

      <TabItem onPress={() => goTo('Favorites')}>
        <FavoriteIcon
          width="24"
          height="24"
          fill={state.index === 3 ? '#fff' : '#777'}
        />
      </TabItem>

      <TabItem onPress={() => goTo('Profile')}>
        {user.avatar !== '' ? (
          <AvatarIcon source={{uri: user.avatar}} />
        ) : (
          <AccountIcon
            width="24"
            height="24"
            fill={state.index === 4 ? '#fff' : '#777'}
          />
        )}
      </TabItem>
    </TabArea>
  );
};

export default CustomTabBar;
