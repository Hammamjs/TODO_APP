<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">
          Enter verification code
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          We've sent a 6-digit verification code to
          <span class="font-medium">{{ email }}</span>
        </p>
      </div>

      <form @submit.prevent="handleVerifyCode" class="mt-8 space-y-6">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 text-center mb-4"
          >
            Verification Code
          </label>
          <div class="flex justify-center space-x-2">
            <input
              v-for="(digit, index) in code"
              :key="index"
              :ref="(el) => (codeInputs[index] = el)"
              v-model="code[index]"
              @input="handleInput(index, $event)"
              @keydown="handleKeydown(index, $event)"
              type="text"
              maxlength="1"
              class="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Didn't receive the code?
            <button
              type="button"
              @click="resendCode"
              :disabled="resendCooldown > 0 || isPending"
              class="font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400"
            >
              {{
                resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : 'Resend code'
              }}
            </button>
          </p>
        </div>

        <button
          type="submit"
          :disabled="isVerifing || !isCodeComplete"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ isVerifing ? 'Verifying...' : 'Verify code' }}
        </button>

        <div class="text-center">
          <router-link
            to="/forgot-password"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            Back to forgot password
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useVerifyCode from '@/composables/useVerifyCode';

const {
  codeInputs,
  email,
  handleInput,
  handleKeydown,
  handleVerifyCode,
  isCodeComplete,
  isPending,
  isVerifing,
  resendCode,
  resendCooldown,
  code,
} = useVerifyCode();
</script>
