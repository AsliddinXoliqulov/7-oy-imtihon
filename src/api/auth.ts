import API from './index';

interface LoginPayload {
  email: string;
  password: string;
}

export const signIn = async (payload: LoginPayload) => {
  const response = await API.post('/api/auth/sign-in', payload);
  return response.data.data;
};
