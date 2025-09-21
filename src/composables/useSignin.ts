import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginMutation } from '@/composables/useAuthQuery';
import { required, email } from '@regle/rules';
import { useRegle } from '@regle/core';
import { useToast } from 'vue-toast-notification';

const useSignIn = () => {
  const router = useRouter();
  const $toast = useToast();

  const form = reactive({
    email: '',
    password: '',
    rememberMe: false,
  });

  const { mutate: login, isPending: isLoggingIn } = useLoginMutation(router);

  const showPassword = ref(false);

  const { r$ } = useRegle(form, {
    email: { required, email },
  });

  const handleSignIn = async () => {
    r$.$validate();
    if (r$.$invalid) {
      $toast.error(r$.email.$errors[0], {
        position: 'top-right',
        duration: 5000,
      });
      console.log('Form is invalid');
      return;
    }

    login({
      email: form.email,
      password: form.password,
    });
  };

  const switchToSignUp = () => {
    router.push('/signup');
  };

  const switchToForgotPassword = () => {
    router.push('/forgot-password');
  };

  return {
    form,
    isLoggingIn,
    showPassword,
    handleSignIn,
    switchToSignUp,
    switchToForgotPassword,
  };
};

export default useSignIn;
