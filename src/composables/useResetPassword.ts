import { useResetPasswordMutation } from '@/composables/useAuthQuery';
import { getFromLocalstorage } from '@/utils/LocalStorage';
import { ref, computed, defineAsyncComponent } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const useResetPassword = () => {
  // lazy load
  const CustomInput = defineAsyncComponent(
    () => import('@/components/Input.vue')
  );

  const form = ref({
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const { mutate: resetPasswordMutation, isPending } =
    useResetPasswordMutation(router);

  const passwordStrength = computed(() => ({
    length: form.value.password.length,
    hasNumber: /\d/.test(form.value.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(form.value.password),
  }));

  const isFormValid = computed(() => {
    return (
      form.value.password &&
      form.value.password === form.value.confirmPassword &&
      passwordStrength.value.length >= 8
    );
  });

  const handleResetPassword = () => {
    const token = getFromLocalstorage('token') as string;
    if (!token) {
      router.push('/forgot-password');
      return;
    }
    resetPasswordMutation({
      confirmPassword: form.value.confirmPassword,
      newPassword: form.value.password,
      token,
    });
  };

  return {
    RouterLink,
    CustomInput,
    isPending,
    isFormValid,
    handleResetPassword,
    form,
    passwordStrength,
  };
};

export default useResetPassword;
