import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const login = async (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const register = async (email: string, password: string) => {
  return api.post('/register', { email, password });
};

export const fetchUsers = async (token: string) => {
  return api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
