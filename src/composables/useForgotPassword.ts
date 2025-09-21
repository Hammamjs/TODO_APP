import { ref } from 'vue';
import { useForgotPasswordMutation } from '@/composables/useAuthQuery';
import { RouterLink, useRouter } from 'vue-router';
import { addToLoacalstorage } from '@/utils/LocalStorage';

const useForgotPassowrd = () => {
  const router = useRouter();
  const email = ref('');

  const { mutate: forgotPasswordMutation, isPending: loading } =
    useForgotPasswordMutation(router);

  const handleForgotPassword = () => {
    forgotPasswordMutation(email.value);
    addToLoacalstorage('user-email', email.value);
  };

  return {
    RouterLink,
    router,
    email,
    forgotPasswordMutation,
    loading,
    handleForgotPassword,
  };
};

export default useForgotPassowrd;
