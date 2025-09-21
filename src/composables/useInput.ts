import type { TextInputProps } from '@/types/reusableComponentsProps';
import { ref, type Ref, defineEmits } from 'vue';

const useInput = (
  props: TextInputProps,
  emit: any
): {
  showPassword: Ref<boolean>;
  getFieldType: () => boolean;
  onInput: (e: Event) => void;
} => {
  const onInput = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value);
  };

  const showPassword = ref(false);

  const getFieldType = (): boolean =>
    props.type === 'password' && !showPassword.value;

  return {
    showPassword,
    getFieldType,
    onInput,
  };
};

export default useInput;
