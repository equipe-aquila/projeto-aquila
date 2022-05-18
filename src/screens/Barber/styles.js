import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? '#fff' : '#777')};
  border-radius: 5px;
  margin: 3px;
`;

export const SwipeItem = styled.View`
  flex: 1;
  background-color: salmon;
`;

export const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const FakeSwiper = styled.View`
  height: 240px;
  background-color: salmon;
`;

export const PageBody = styled.View`
  background-color: #fff;
  border-top-left-radius: 50px;
  margin-top: -50px;
  min-height: 400px;
`;

export const UserInfoArea = styled.View`
  flex-direction: row;
  margin-top: -30px;
`;

export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 20px;
  border-width: 4px;
  border-color: #fff;
`;
export const UserInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const UserName = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const UserFavButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #eee;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 0 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const ServiceArea = styled.View`
  margin-top: 30px;
`;

export const ServicesTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: salmon;
  margin-left: 30px;
  margin-bottom: 20px;
`;
export const ServiceItem = styled.View`
  flex-direction: row;
  margin: 0 24px 20px 24px;
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 8px;
`;

export const ServiceInfo = styled.View`
  flex: 1;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;

export const ServicePrice = styled.Text`
  font-size: 14px;
  color: #888;
`;

export const ChooseServiceButton = styled.TouchableOpacity`
  background-color: salmon;
  border-radius: 10px;
  padding: 10px 15px;
`;

export const ChooseServiceButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const TestimonialArea = styled.View`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const TestimonialItem = styled.View`
  background-color: #333;
  border-radius: 10px;
  padding: 15px;
  height: 110px;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
`;

export const TestimonialInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const TestimonialName = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const TestimonialBody = styled.Text`
  color: #fff;
  font-size: 13px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;
