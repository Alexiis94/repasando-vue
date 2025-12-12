import axios from 'axios';
import Cookies from 'js-cookie';

export const http = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Manejo Global
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // TODO: Implementar lógica de Refresh Token o Logout forzado
      console.warn('Sesión expirada o inválida');
      // window.location.href = '/login'; // Cuidado con esto en SPAs, prefiere usar un evento o store
    }

    return Promise.reject(error);
  }
);
