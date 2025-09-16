export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('authToken', token);
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('authToken');
};

export const getUserData = (): any => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const setUserData = (userData: any): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const removeUserData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('userData');
};
