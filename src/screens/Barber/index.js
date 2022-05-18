import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';
import AppointmentModal from '../../components/AppointmentModal';

import FavoriteFullIcon from '../../assets/favorite_full.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import {
  Container,
  Scroller,
  SwipeDot,
  SwipeItem,
  SwipeImage,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  UserAvatar,
  UserInfo,
  UserName,
  UserFavButton,
  LoadingIcon,
  ServiceArea,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ChooseServiceButton,
  ChooseServiceButtonText,
  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
  BackButton,
} from './styles';

import Api from '../../Api';

const Barber = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      const response = await Api.getBarber(route.params.id);

      if (response.error === '') {
        setUserInfo(response.data);
        setFavorited(response.data.favorited);
      } else {
        // eslint-disable-next-line no-alert
        alert(`Error: ${response.error}`);
      }

      setLoading(false);
    };

    getBarberInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavButton = () => {
    setFavorited(!favorited);
  };

  const handleChooseService = (index) => {
    setSelectedService(index);
    setShowModal(true);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{height: 240}}
            dot={<SwipeDot />}
            activeDot={<SwipeDot active />}
            paginationStyle={{top: 16, right: 16, bottom: null, left: null}}
            autoplay
            autoplayTimeout={4}>
            {userInfo.photos.map((photo, index) => (
              <SwipeItem key={index}>
                <SwipeImage source={{uri: photo.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />

            <UserInfo>
              <UserName>{userInfo.name}</UserName>
              <Stars stars={userInfo.stars} showNumber />
            </UserInfo>

            <UserFavButton onPress={handleFavButton}>
              {favorited ? (
                <FavoriteFullIcon width="24" height="24" fill="#ff0000" />
              ) : (
                <FavoriteIcon width="24" height="24" fill="#ff0000" />
              )}
            </UserFavButton>
          </UserInfoArea>

          {loading && <LoadingIcon size="large" color="#333" />}

          {userInfo.services && (
            <ServiceArea>
              <ServicesTitle>Lista de Serviços</ServicesTitle>
              {userInfo.services.map((service, index) => (
                <ServiceItem key={index}>
                  <ServiceInfo>
                    <ServiceName>{service.name}</ServiceName>
                    <ServicePrice>R$ {service.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                  <ChooseServiceButton
                    onPress={() => handleChooseService(index)}>
                    <ChooseServiceButtonText>Agendar</ChooseServiceButtonText>
                  </ChooseServiceButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}

          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons
                prevButton={<NavPrevIcon width="35" height="35" fill="#ccc" />}
                nextButton={<NavNextIcon width="35" height="35" fill="#ccc" />}>
                {userInfo.testimonials.map((testimonial, index) => (
                  <TestimonialItem key={index}>
                    <TestimonialInfo>
                      <TestimonialName>{testimonial.name}</TestimonialName>
                      <Stars stars={testimonial.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{testimonial.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#fff" />
      </BackButton>

      <AppointmentModal
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </Container>
  );
};

export default Barber;
