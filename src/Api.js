import AsyncStorage from '@react-native-community/async-storage';
const baseAPI = 'https://api.b7web.com.br/devbarber/api';

export default {
  verifyToken: async (token) => {
    const request = await fetch(`${baseAPI}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });

    const response = await request.json();
    return response;
  },

  signIn: async (email, password) => {
    const request = await fetch(`${baseAPI}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const response = await request.json();
    return response;
  },

  signUp: async (name, email, password) => {
    const request = await fetch(`${baseAPI}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });

    const response = await request.json();
    return response;
  },

  logout: async () => {
    const token = await AsyncStorage.getItem('token');

    const request = await fetch(`${baseAPI}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });

    const response = await request.json();
    return response;
  },

  getBarbers: async (lat = null, lng = null, address = '') => {
    const token = await AsyncStorage.getItem('token');
    const request = await fetch(
      `${baseAPI}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`,
    );
    const response = await request.json();
    return response;
  },

  getBarber: async (id) => {
    const token = await AsyncStorage.getItem('token');

    const request = await fetch(`${baseAPI}/barber/${id}?token=${token}`);
    const response = await request.json();

    return response;
  },

  setAppointment: async (
    userId,
    service,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour,
  ) => {
    const token = await AsyncStorage.getItem('token');

    const request = await fetch(`${baseAPI}/user/appointment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        id: userId,
        service,
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
        hour: selectedHour,
      }),
    });
  },
};
