import axios from 'axios';
import { getToken } from '../utils/token';
import { authService } from './auth/authService';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

axios.interceptors.request.use(
  async (config: any) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: any) => Promise.reject(error),
);

function getErrorMessage(status: number) {
  switch (status) {
    case 400: 
      return 'No se pudo procesar su solicitud. Por favor, revise los datos e intente de nuevo.';
    case 401:
      return 'Lo sentimos, ocurrió un problema.';
    case 403: 
      return 'Acceso denegado. No tiene permisos para realizar esta acción.';
    default:
      return 'Lo sentimos, ocurrió un problema. Por favor, intente de nuevo más tarde.';
  }
}

axios.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;
    
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await authService.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        authService.logout();
        window.location.href = '/authentication/login';
        return Promise.reject(refreshError);
      }
    }
    
    const message = getErrorMessage(status);
    console.error('API Error:', message);
    return Promise.reject(error);
  },
);

const http = {
  get: (url: string, options: any) =>
    (options.blob &&
      axios.get(url, {
        responseType: 'blob',
        ...defaultOptions,
        ...options,
      })) ||
    axios.get(url, { ...defaultOptions, ...options }),
  post: (url: string, data: any, options = {}) =>
    axios.post(url, data, { ...defaultOptions, ...options }),
  patch: (url: string, data: any, options = {}) =>
    axios.patch(url, data, { ...defaultOptions, ...options }),
  put: (url: string, data: any, options = {}) =>
    axios.put(url, data, { ...defaultOptions, ...options }),
  delete: (url: string, options = {}) =>
    axios.delete(url, { ...defaultOptions, ...options }),
};

export default http;