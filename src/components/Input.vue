<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1 relative">
      <input
        :id="id"
        :value="modelValue"
        @input="onInput"
        :type="getFieldType() ? 'password' : 'text'"
        :autocomplete="autocomplete || 'on'"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        :placeholder="placeholder || ''"
      />
      <button
        v-if="id.startsWith('password')"
        type="button"
        @click="showPassword = !showPassword"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
      >
        {{ showPassword ? 'Hide' : 'Show' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useInput from '@/composables/useInput';
import type { TextInputProps } from '@/types/reusableComponentsProps';
import { toRefs } from 'vue';

const props = defineProps<TextInputProps>();

const { autocomplete, id, label, modelValue, placeholder } = toRefs(props);
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const { getFieldType, onInput, showPassword } = useInput(props, emit);
</script>
