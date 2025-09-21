import { useSignupMutation } from '@/composables/useAuthQuery';
import handleError from '@/utils/handleError';
import handleSuccess from '@/utils/handleSuccess';
import { useRegle } from '@regle/core';
import {
  email,
  maxLength,
  minLength,
  required,
  withMessage,
} from '@regle/rules';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const useSignup = () => {
  const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const router = useRouter();
  const $toast = useToast();

  const { mutate: signup, isPending } = useSignupMutation(router);

  const showPassword = ref(false);

  const passwordComplexity = withMessage((value: unknown) => {
    const val = value as string;

    if (!val) return false;
    if (val.length < 8) return false;
    if (val.length > 20) return false;
    const hasNumber = /\d/.test(val);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
    const hasLetter = /[a-zA-Z]/.test(val);
    return hasNumber && hasSpecial && hasLetter;
  }, 'Password must contain at least one number, one special character, and one letter');

  const rules = {
    name: { required, minLength: minLength(2), maxLength: maxLength(15) },
    email: { required, email },
    password: {
      required,
      validator: passwordComplexity,
    },
    confirmPassword: {
      required,
      validator: withMessage(
        (value) => value === form.value.password,
        'Passwords must match'
      ),
    },
  };

  const { r$ } = useRegle(form, rules);

  const passwordStrength = computed(() => ({
    length: form.value.password.length,
    hasNumber: /\d/.test(form.value.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(form.value.password),
  }));

  const isFormValid = computed(() => !r$.$invalid);

  const handleSignUp = async () => {
    r$.$validate();

    if (r$.$invalid) {
      const errors$ = [...Object.values(r$.$errors)]
        .filter((error) => error.length)
        .flat();
      if (errors$.length) {
        $toast.error(errors$[0], {
          position: 'top-right',
          duration: 5000,
        });
      }
      return;
    }

    try {
      signup({
        email: form.value.email,
        password: form.value.password,
        name: form.value.name,
        confirmPassword: form.value.confirmPassword,
      });

      handleSuccess('Account created');
    } catch (err) {
      return handleError(err);
    }
  };

  const switchToSignIn = () => {
    router.push('/signin');
  };

  return {
    isPending,
    showPassword,
    passwordStrength,
    isFormValid,
    handleSignUp,
    switchToSignIn,
  };
};

export default useSignup;
