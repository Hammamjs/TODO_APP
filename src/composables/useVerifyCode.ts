import {
  useForgotPasswordMutation,
  useCodeVerificationMutation,
} from '@/composables/useAuthQuery';
import { getFromLocalstorage } from '@/utils/LocalStorage';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const useVerifyCode = () => {
  const email = ref<string>(getFromLocalstorage('user-email') as string);
  const code = ref(['', '', '', '', '', '']);
  const codeInputs = ref([]);
  const resendCooldown = ref(0);
  const increaseTime = ref(10);

  const router = useRouter();

  const {
    mutate: resendCodeMutation,
    isError: isResetCodeError,
    isPending,
  } = useForgotPasswordMutation(router);

  const {
    mutate: codeVerificationMutation,
    isError,
    isPending: isVerifing,
  } = useCodeVerificationMutation();

  const isCodeComplete = computed(() => {
    return code.value.every((digit) => digit !== '');
  });

  const handleInput = (index: number, event: Event) => {
    const value = (event.target as HTMLInputElement)?.value;
    if (value && index < 5) {
      (codeInputs.value[index + 1] as HTMLInputElement)?.focus();
    }
  };

  const handleKeydown = (index: number, event: KeyboardEvent) => {
    if (event.key === 'Backspace' && !code.value[index] && index > 0) {
      (codeInputs.value[index - 1] as HTMLInputElement)?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const verificationCode = code.value.join('');

    codeVerificationMutation(verificationCode);

    // Clear the code
    if (isError.value) {
      code.value = ['', '', '', '', '', ''];
      (codeInputs.value[0] as HTMLInputElement)?.focus();
    } else {
      router.push('/reset-password');
    }
  };

  const resendCode = () => {
    if (resendCooldown.value > 0) return;

    if (!email.value) {
      router.push('/forgot-password');
      return;
    }

    resendCodeMutation(email.value);

    if (isResetCodeError.value) {
      // Start cooldown
      resendCooldown.value = 30 + increaseTime.value;
      increaseTime.value += 10;
      const interval = setInterval(() => {
        resendCooldown.value--;
        if (resendCooldown.value <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
  };

  onMounted(() => {
    (codeInputs.value[0] as HTMLInputElement)?.focus();
  });

  return {
    codeInputs,
    email,
    isPending,
    isVerifing,
    isCodeComplete,
    handleInput,
    handleVerifyCode,
    handleKeydown,
    resendCode,
    resendCooldown,
    code,
  };
};

export default useVerifyCode;
