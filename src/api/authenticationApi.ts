import type {
  LoginResponse,
  LoginType,
  SignupResponse,
  SignupType,
} from '@/types/auth';
import apiInstance from './BaseUrl';

export const login = async ({
  email,
  password,
}: LoginType): Promise<LoginResponse> => {
  const response = await apiInstance.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async ({
  name,
  email,
  password,
  confirmPassword,
}: SignupType): Promise<SignupResponse> => {
  const response = await apiInstance.post('/auth/signup', {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

export const logout = async (email: string) => {
  const response = await apiInstance.post('/auth/logout', { email });
  return response.data;
};

export const forgotPassowrd = async (email: string) => {
  const response = await apiInstance.post('/auth/forgotPassword', { email });
  return response.data;
};

export const codeVerification = async (resetCode: string) => {
  const response = await apiInstance.post('/auth/verifyCode', {
    resetCode,
  });
  return response.data;
};

export const resetPassword = async ({
  token,
  confirmPassword,
  newPassword,
}: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await apiInstance.put('/auth/resetPassword', {
    token,
    newPassword,
    confirmPassword,
  });

  return response.data;
};
