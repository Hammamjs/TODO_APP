<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <button
            @click="switchToSignUp"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </button>
        </p>
      </div>

      <form @submit.prevent="handleSignIn" class="mt-8 space-y-6">
        <div class="space-y-4">
          <!-- Email Input -->
          <Input
            id="email"
            label="Email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
          />
          <!-- Password Input -->
          <Input
            id="password"
            label="Password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <button
            type="button"
            @click="switchToForgotPassword"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </button>
        </div>

        <button
          type="submit"
          :disabled="isLoggingIn"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ isLoggingIn ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSignIn from '@/composables/useSignin';
import { defineAsyncComponent } from 'vue';

const Input = defineAsyncComponent(() => import('@/components/Input.vue'));

const {
  form,
  handleSignIn,
  isLoggingIn,
  showPassword,
  switchToForgotPassword,
  switchToSignUp,
} = useSignIn();
</script>
