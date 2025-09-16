import http from '../http';
import { setToken, setUserData, removeToken, removeUserData, getToken, getUserData } from '../../utils/token';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    active: boolean;
  };
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  active: boolean;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await http.post('/api/v1/auth/login', credentials);
    const data = response.data.data;

    setToken(data.access_token);
    setUserData(data.user);
    
    return data;
  },

  logout: (): void => {
    removeToken();
    removeUserData();
  },

  getCurrentUser: (): User | null => {
    return getUserData();
  },

  isAuthenticated: (): boolean => {
    return !!getToken();
  },

  refreshToken: async (): Promise<string> => {
    const response = await http.post('/api/v1/auth/refresh', {});
    const data = response.data.data;
    setToken(data.access_token);
    return data.access_token;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await http.post('/api/v1/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
  }
};
