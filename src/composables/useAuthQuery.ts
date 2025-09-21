import {
  codeVerification,
  forgotPassowrd,
  login,
  logout,
  resetPassword,
  signup,
} from '@/api/authenticationApi';
import { useAuthStore } from '@/store/useAuthStore';
import handleSuccess from '@/utils/handleSuccess';
import { useMutation } from '@tanstack/vue-query';
import handleError from '@/utils/handleError';
import { type Router } from 'vue-router';
import {
  addToLoacalstorage,
  removeFromLocalstorage,
} from '@/utils/LocalStorage';

const { setUser } = useAuthStore();

export const useLoginMutation = (router: Router) => {
  return useMutation({
    mutationFn: login,
    onError: (err) => handleError(err),
    onSuccess: (response) => {
      handleSuccess('Loggin completed successfully ✅');

      setUser(response?.data);
      router.push('/');
    },
  });
};

export const useSignupMutation = (router: Router) => {
  return useMutation({
    mutationFn: signup,
    onError: (err) => handleError(err),
    onSuccess: () => {
      handleSuccess('Registration completed successfully');
      setTimeout(() => {
        router.push('/signin');
      }, 1500);
    },
  });
};

export const useForgotPasswordMutation = (router: Router) =>
  useMutation({
    mutationFn: forgotPassowrd,
    onSuccess: () => {
      handleSuccess('Verification code sent');
      setTimeout(() => {
        router.push('/verify-code');
      }, 1500);
    },
    onError: (err) => handleError(err),
  });

export const useCodeVerificationMutation = () =>
  useMutation({
    mutationFn: codeVerification,
    onSuccess: (data) => {
      removeFromLocalstorage('user-email');
      handleSuccess('Code verified successfuly');
      addToLoacalstorage('token', data.tempToken);
      console.log(data);
    },
    onError: (err) => handleError(err),
  });

export const useResetPasswordMutation = (router: Router) =>
  useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      handleSuccess(data.message);
      removeFromLocalstorage('token');
      router.push('/signin');
    },
    onError: (err) => handleError(err),
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeFromLocalstorage('user');
      handleSuccess('Loggedout Successfully');
      window.location.reload();
    },
    onError: (err) => handleError(err),
  });
